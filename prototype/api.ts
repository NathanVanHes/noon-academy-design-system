/**
 * ElevenLabs Conversational AI Agent — handles the full voice tutor loop.
 * STT + LLM + TTS all handled by the agent via WebSocket.
 */
import { Conversation } from '@elevenlabs/client';
import type { Question } from './questions';
import type { Lang } from './i18n';

const AGENT_ID = 'agent_0701krb7q27xfnwtvb4rwpwr9m22';
const ELEVENLABS_KEY = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY || '';
const ANTHROPIC_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '';

// ─── Generate breakdown points from a concept description ──────

export async function generateBreakdown(
  topicName: string,
  conceptDescription: string,
  lang: 'en' | 'ar',
): Promise<{ title: string; points: string[] }> {
  const title = lang === 'ar' ? `${topicName}: الأساسيات` : `${topicName}: The basics`;
  const example = lang === 'ar'
    ? '{"points":["ترتيب العناصر على حافة مشتركة غير مرئية","تخلق اتصال بصري ونظام بين العناصر","تجعل التخطيط يبدو مقصود ومنظم"]}'
    : '{"points":["Placing elements along a shared invisible edge","Creates visual connection and order between elements","Makes layouts feel intentional and organized"]}';

  const prompt = lang === 'ar'
    ? `اكتب 3 نقاط تلخص "${topicName}". كل نقطة بنفس طول وأسلوب هذا المثال: ${example}. الوصف: ${conceptDescription}. أجب بصيغة JSON فقط: {"points":["...","...","..."]}`
    : `Write 3 bullet points about "${topicName}". Match the length and style of this example exactly: ${example}. Description: ${conceptDescription}. Reply JSON only: {"points":["...","...","..."]}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const text = data.content[0].text;
    const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] || text);
    return { title, points: json.points || [] };
  } catch (err) {
    console.warn('Breakdown generation failed, using fallback:', err);
    return { title, points: [conceptDescription] };
  }
}

export type TutorMode = 'speaking' | 'listening';

// Patch agent turn config once — sets long timeout to prevent reprompts
let turnConfigured = false;
const configureTurnPromise = fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'xi-api-key': ELEVENLABS_KEY,
  },
  body: JSON.stringify({
    conversation_config: {
      turn: {
        turn_timeout: 60,
      },
    },
  }),
}).then(() => { turnConfigured = true; }).catch(err => console.warn('Failed to configure agent turn:', err));

export interface TutorSessionCallbacks {
  onConnect: (conversationId: string) => void;
  onDisconnect: () => void;
  onModeChange: (mode: TutorMode) => void;
  onMessage: (text: string, role: 'user' | 'agent') => void;
  /** Fires with partial agent text as LLM streams — before speech starts */
  onAgentChunk?: (text: string) => void;
  onAudioAlignment: (chars: string[], startTimesMs: number[], durationsMs: number[]) => void;
  onError: (message: string) => void;
  onStatusChange: (status: string) => void;
}

function buildTutorPrompt(question: Question, studentAnswer: string, lang: Lang): string {
  const correctOption = question.options.find(o => o.label === question.correctLabel)!;
  const selectedOption = question.options.find(o => o.label === studentAnswer)!;
  const langName = lang === 'ar' ? 'Arabic' : 'English';

  return `You are a voice tutor for Noon Academy. You guide students to understanding through conversation — never by giving answers directly.

Respond ONLY in ${langName}.

## Session Context
- Subject: Design
- Question: ${question.text[lang]}
- A. ${question.options[0].text[lang]}
- B. ${question.options[1].text[lang]}
- C. ${question.options[2].text[lang]}
- D. ${question.options[3].text[lang]}
- Student chose: ${studentAnswer} - ${selectedOption.text[lang]}
- Correct answer: ${question.correctLabel} - ${correctOption.text[lang]}

## Tutoring Method — Socratic Guidance (Max 10 exchanges)

### Opening (Exchange 1)
Start by validating something in their thinking, then immediately ask ONE specific Socratic question about why their answer doesn't fit. Do not repeat the question. Jump straight into reasoning.

### Narrow (Exchanges 2-4)
Ask short, targeted questions that eliminate misconceptions one at a time.

### Bridge (Exchanges 5-7)
Give stronger hints. Reference specific concepts from the correct answer.

### Confirm
When the student implies correct reasoning, ask them to explain it back. Only after they explain correctly, say EXACTLY: "${lang === 'ar' ? 'أحسنت، فهمتها. يلا ننتقل للسؤال اللي بعده.' : "You've got it. Let's move on to the next question."}"

### Exhaust (Exchanges 7-8 if stuck)
If not progressing, explain directly in 2-3 sentences. End with EXACTLY: "${lang === 'ar' ? 'الحين عرفت. يلا ننتقل للسؤال اللي بعده.' : "Now you know. Let's move on to the next question."}"

## Rules
- NEVER say the answer letter until the student reasons it or exhaust triggers.
- Keep every response to 1-3 sentences. Voice brevity.
- Never be condescending. Sound like a human tutor.`;
}

export async function configureAgentForTutor(question: Question, studentAnswer: string, lang: Lang) {
  const prompt = buildTutorPrompt(question, studentAnswer, lang);
  const selectedOption = question.options.find(o => o.label === studentAnswer)!;

  const firstMessage = lang === 'ar'
    ? `اخترت "${selectedOption.text.ar}" — أقدر أفهم ليش فكرت كذا. بس خلني أسألك: وش يعني ${selectedOption.text.ar} فعلاً في التصميم؟`
    : `You picked "${selectedOption.text.en}" — I can see why you'd think that. But let me ask you: what does ${selectedOption.text.en.toLowerCase()} actually mean in design?`;

  await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_KEY,
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          first_message: firstMessage,
          prompt: {
            prompt,
          },
        },
        turn: {
          turn_timeout: 60,
        },
      },
    }),
  });
}

export async function startTutorSession(
  question: Question,
  studentAnswer: string,
  lang: Lang,
  callbacks: TutorSessionCallbacks,
  prefetchConfig?: Promise<void>,
) {
  // Wait for prefetched config or configure now
  if (prefetchConfig) {
    await prefetchConfig;
  } else {
    await configureAgentForTutor(question, studentAnswer, lang);
  }

  const conversation = await Conversation.startSession({
    agentId: AGENT_ID,
    connectionType: 'websocket',
    overrides: {
      agent: {
        language: lang === 'ar' ? 'ar' : 'en',
      },
    },
    onConnect: ({ conversationId }) => {
      callbacks.onConnect(conversationId);
    },
    onDisconnect: () => {
      callbacks.onDisconnect();
    },
    onModeChange: ({ mode }) => {
      callbacks.onModeChange(mode as TutorMode);
    },
    onMessage: ({ message, role }) => {
      callbacks.onMessage(message, role);
    },
    onAudioAlignment: (alignment) => {
      callbacks.onAudioAlignment(
        alignment.chars,
        alignment.char_start_times_ms,
        alignment.char_durations_ms,
      );
    },
    onDebug: (info: any) => {
      if (info?.type === 'tentative_agent_response' && info.response) {
        callbacks.onAgentChunk?.(info.response);
      }
    },
    onError: (message) => {
      callbacks.onError(typeof message === 'string' ? message : 'Unknown error');
    },
    onStatusChange: ({ status }) => {
      callbacks.onStatusChange(status);
    },
  });

  conversation.setMicMuted(true);
  return conversation;
}

// ─── Catchup session: concept overview before quiz ──────────────

export interface CatchupConfig {
  subjectName: string;   // e.g. "Design"
  topicName: string;     // e.g. "Alignment"
  conceptsCovered: string; // what this concept is about
}

function buildCatchupContext(config: CatchupConfig, lang: Lang): string {
  const { subjectName, topicName, conceptsCovered } = config;

  if (lang === 'ar') {
    return `[وضع مراجعة المفاهيم]

أنت معلم صوتي لأكاديمية نون. أنت في جلسة مراجعة سريعة لمفهوم واحد قبل الاختبار.

## السياق
- المادة: ${subjectName}
- المفهوم: ${topicName}
- التفاصيل: ${conceptsCovered}

## طريقتك
1. اسأل الطالب وش يعرف عن "${topicName}". خله يتكلم أول.
2. إذا يعرف — أكّد واعطه مثال واقعي يعمّق فهمه.
3. إذا ما يعرف — اشرح المفهوم بشكل بسيط بجملتين مع مثال ملموس.
4. اسأل سؤال متابعة عشان تتأكد إنه فاهم — لازم يشرح بكلامه، مو بس يقول "أيوا".
5. بس لما الطالب يشرح المفهوم صح بكلامه، قل بالضبط: "أحس إنك جاهز. يلا نبدأ الاختبار."
6. إذا بعد ٥-٦ تبادلات ما قدر يشرح، قل بالضبط: "ما عليك — يلا نجرب سؤال ونشوف. يلا نبدأ الاختبار."

## القواعد
- ردودك جملتين أو ثلاث بالكثير.
- ركّز على مفهوم "${topicName}" بس — لا تروح لمواضيع ثانية.
- كن دافئ ومشجع.
- لا تقول "جاهز" إلا إذا الطالب فعلاً شرح المفهوم صح.
- إذا الطالب يعطي إجابات عشوائية، وجّهه بلطف.`;
  }

  return `[CONCEPT CATCHUP MODE]

You are a voice tutor for Noon Academy. You are running a quick refresher on ONE concept before a quiz.

## Context
- Subject: ${subjectName}
- Concept: ${topicName}
- What it means: ${conceptsCovered}

## Your approach
1. Ask the student what they know about "${topicName}". Let them talk first.
2. If they know it — confirm and give a real-world example that deepens their understanding.
3. If they don't — explain the concept simply in 2 sentences with a concrete example.
4. Ask a follow-up question to CHECK they actually understand — they must demonstrate understanding in their own words, not just say "yes" or "ok."
5. ONLY say "I think you're ready. Let's start the quiz." when the student has DEMONSTRATED understanding by explaining the concept correctly or answering a check question correctly.
6. If after 5-6 exchanges the student still can't explain it, say EXACTLY: "That's okay — let's try a question and see how it goes. Let's start the quiz." Do NOT say they're ready — acknowledge they're still learning.

## Rules
- Keep every response to 2-3 sentences max. Voice brevity.
- Stay focused on "${topicName}" only — don't drift to other topics.
- Be warm and encouraging. This is a refresher, not a test.
- If they already know it well, don't drag it out — confirm and move on.
- NEVER say "you're ready" unless the student has actually explained the concept back correctly.
- If the student gives nonsense, off-topic, or random answers, gently redirect — do NOT accept it as understanding.
- If the student says "I don't know" repeatedly, teach them directly, then check ONE more time before moving on with the "let's try a question" exhaust phrase.`;
}

function buildCatchupFirstMessage(config: CatchupConfig, lang: Lang): string {
  if (lang === 'ar') {
    return `قبل الاختبار، خلنا نراجع "${config.topicName}" بسرعة. وش تعرف عنه؟`;
  }
  return `Before the quiz, let's quickly review "${config.topicName}." What do you know about it?`;
}

// Pre-configure catchup — call this early (e.g. on language select screen)
let catchupConfigPromise: Promise<void> | null = null;

export function prefetchCatchupConfig(config: CatchupConfig, lang: Lang) {
  const catchupPrompt = buildCatchupContext(config, lang);
  const catchupFirstMsg = buildCatchupFirstMessage(config, lang);
  catchupConfigPromise = fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'xi-api-key': ELEVENLABS_KEY },
    body: JSON.stringify({
      conversation_config: {
        agent: { first_message: catchupFirstMsg, prompt: { prompt: catchupPrompt } },
        turn: { turn_timeout: 60 },
      },
    }),
  }).then(() => {}).catch(err => console.warn('Failed to prefetch catchup config:', err));
}

export async function startCatchupSession(
  config: CatchupConfig,
  lang: Lang,
  callbacks: TutorSessionCallbacks,
) {
  let conv: any = null;

  // Wait for prefetched config or configure now
  if (catchupConfigPromise) {
    await catchupConfigPromise;
    catchupConfigPromise = null;
  } else {
    const catchupPrompt = buildCatchupContext(config, lang);
    const catchupFirstMsg = buildCatchupFirstMessage(config, lang);
    const p = buildCatchupContext(config, lang);
    const m = buildCatchupFirstMessage(config, lang);
    await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'xi-api-key': ELEVENLABS_KEY },
      body: JSON.stringify({
        conversation_config: {
          agent: { first_message: m, prompt: { prompt: p } },
          turn: { turn_timeout: 60 },
        },
      }),
    });
  }

  const conversation = await Conversation.startSession({
    agentId: AGENT_ID,
    connectionType: 'websocket',
    overrides: {
      agent: {
        language: lang === 'ar' ? 'ar' : 'en',
      },
    },
    onConnect: ({ conversationId }) => {
      callbacks.onConnect(conversationId);
    },
    onDisconnect: () => {
      callbacks.onDisconnect();
    },
    onModeChange: ({ mode }) => {
      callbacks.onModeChange(mode as TutorMode);
    },
    onMessage: ({ message, role }) => {
      callbacks.onMessage(message, role);
    },
    onAudioAlignment: () => {},
    onDebug: (info: any) => {
      if (info?.type === 'tentative_agent_response' && info.response) {
        callbacks.onAgentChunk?.(info.response);
      }
    },
    onError: (message) => {
      callbacks.onError(typeof message === 'string' ? message : 'Unknown error');
    },
    onStatusChange: ({ status }) => {
      callbacks.onStatusChange(status);
    },
  });

  conv = conversation;
  conversation.setMicMuted(true);
  return conversation;
}
