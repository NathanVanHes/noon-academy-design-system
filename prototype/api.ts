/**
 * ElevenLabs Conversational AI Agent — handles the full voice tutor loop.
 * STT + LLM + TTS all handled by the agent via WebSocket.
 */
import { Conversation } from '@elevenlabs/client';
import type { Question } from './questions';
import type { Lang } from './i18n';

const AGENT_ID_EN = 'agent_0701krb7q27xfnwtvb4rwpwr9m22';
const AGENT_ID_AR = 'agent_9501kre9je7nebybhp1z96j3gjv4';

function getAgentId(lang: Lang): string {
  return lang === 'ar' ? AGENT_ID_AR : AGENT_ID_EN;
}
const ELEVENLABS_KEY = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY || '';
const ANTHROPIC_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '';

async function getSignedUrl(lang: Lang): Promise<string> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${getAgentId(lang)}`,
    { headers: { 'xi-api-key': ELEVENLABS_KEY } },
  );
  if (!res.ok) throw new Error('Failed to get signed URL');
  const data = await res.json();
  return data.signed_url;
}

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

// Patch agent turn config once — sets long timeout + eager interruption
let turnConfigured = false;
const turnPatchBody = JSON.stringify({
  conversation_config: {
    turn: { turn_timeout: 30, mode: 'turn', turn_eagerness: 'eager' },
    vad: { background_voice_detection: true },
    conversation: {
      client_events: ['audio', 'interruption', 'user_transcript', 'agent_response', 'agent_response_correction', 'internal_tentative_agent_response'],
    },
  },
});
const turnPatchHeaders = { 'Content-Type': 'application/json', 'xi-api-key': ELEVENLABS_KEY };
const configureTurnPromise = Promise.all([
  fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID_EN}`, { method: 'PATCH', headers: turnPatchHeaders, body: turnPatchBody }),
  fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID_AR}`, { method: 'PATCH', headers: turnPatchHeaders, body: turnPatchBody }),
]).then(() => { turnConfigured = true; }).catch(err => console.warn('Failed to configure agent turn:', err));

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

ALWAYS respond in ${langName}, even if the student writes or speaks in another language. NEVER switch languages.

## Session Context
- Subject: Arithmetic — Natural Numbers
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
- The student can see all four options (A, B, C, D) on screen. Reference them by letter and content when guiding — e.g. "look at option B" or "what about the one that says...".
- NEVER reveal the correct answer letter until the student reasons it or exhaust triggers.
- Keep every response to 1-3 sentences. Voice brevity.
- Never be condescending. Sound like a human tutor.`;
}

export async function configureAgentForTutor(question: Question, studentAnswer: string, lang: Lang) {
  const prompt = buildTutorPrompt(question, studentAnswer, lang);

  await fetch(`https://api.elevenlabs.io/v1/convai/agents/${getAgentId(lang)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_KEY,
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: { prompt },
          first_message: '{{first_message}}',
        },
        turn: { turn_timeout: 30, mode: 'turn', turn_eagerness: 'eager' },
        vad: { background_voice_detection: true },
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
  const selectedOption = question.options.find(o => o.label === studentAnswer)!;
  const correctOption = question.options.find(o => o.label === question.correctLabel)!;
  const langName = lang === 'ar' ? 'Arabic' : 'English';

  // Generate first message, PATCH agent prompt, get signed URL — all in parallel
  const [tutorFirstMsg, , signedUrl] = await Promise.all([
    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 100,
        messages: [{ role: 'user', content: `You are a voice math tutor speaking in ${langName}. A student answered "${selectedOption.text[lang]}" to this question: "${question.text[lang]}". The correct answer is "${correctOption.text[lang]}". In 2 sentences, acknowledge their thinking and ask ONE Socratic question that guides them toward the correct answer. No greetings, no markdown. Plain spoken text. Respond in ${langName} only.` }],
      }),
    }).then(r => r.ok ? r.json() : Promise.reject()).then(d => d.content[0].text).catch(() =>
      lang === 'ar'
        ? `اخترت "${selectedOption.text.ar}" — خلنا نشوف ليش. وش تعرف عن الفرق بين "${selectedOption.text.ar}" و "${correctOption.text.ar}"؟`
        : `You picked "${selectedOption.text.en}" — let's think about this. What do you think makes "${correctOption.text.en}" different from "${selectedOption.text.en}"?`
    ),
    configureAgentForTutor(question, studentAnswer, lang),
    getSignedUrl(lang),
  ]);

  const conversation = await Conversation.startSession({
    signedUrl,
    dynamicVariables: { first_message: tutorFirstMsg },
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

  // Lower volume so echo cancellation can distinguish user voice
  conversation.setVolume({ volume: 0.35 });
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

أنت معلم صوتي لأكاديمية نون. أنت في جلسة مراجعة سريعة قبل اختبار عن "${topicName}" في مادة ${subjectName}.

تكلم بالعربي دائماً حتى لو الطالب كتب بالإنجليزي.

## السياق
- المادة: ${subjectName}
- المفهوم: ${topicName}
- التفاصيل: ${conceptsCovered}

## الإيقاع التعليمي: علّم ← تحقق ← عزّز ← تقدّم

اتبع هذا النمط في كل تبادل:

### لما الطالب يجيب صح:
١) أكّد باختصار ("صح، أحسنت")
٢) علّمه معلومة جديدة مرتبطة بالمفهوم (جملة واحدة من المعرفة الجديدة)
٣) اسأله سؤال عن اللي علمته

### لما الطالب يجيب غلط:
١) لا تقول بس "غلط" — اشرح ليش بطريقة تعليمية (مثلاً: "في الحقيقة، الصفر ما يدخل لأن...")
٢) أعطه مثال ملموس أو تشبيه
٣) اسأل نسخة أبسط من نفس السؤال

### التقدم:
- ابدأ بأسئلة التعريف الأساسية
- بعد ١-٢ إجابة صحيحة: علّم خاصية ثم تحقق منها
- بعد ٢-٣ إجابات صحيحة: علّم حالة خاصة أو فرق مهم ثم تحقق منه
- بعد ما يثبت فهمه (على الأقل ٣-٤ تبادلات فيها تعليم)، قل بالضبط: "أحس إنك جاهز. يلا نبدأ الاختبار."
- إذا بعد ٥-٦ تبادلات لسا يواجه صعوبة، قل بالضبط: "ما عليك — يلا نجرب سؤال ونشوف. يلا نبدأ الاختبار."

## قواعد الردود
- كل رد لازم يكون فيه تعليم وسؤال. لا تسأل سؤال بدون ما تضيف معلومة.
- ردودك جملتين أو ثلاث: وحدة تعليم ووحدة سؤال.
- خلّ الطالب يحس إنه يتعلم شي جديد كل مرة، مو إنه يُستجوب.
- لا تبدأ بكلمات مثل "بالتأكيد" أو "طبعاً". ادخل مباشرة.`;
  }

  return `[CONCEPT CATCHUP MODE]

You are a voice tutor for Noon Academy. You are running a quick refresher before a quiz on "${topicName}" in ${subjectName}.

ALWAYS respond in English, even if the student writes in another language.

## Context
- Subject: ${subjectName}
- Concept: ${topicName}
- What it means: ${conceptsCovered}

## Pedagogical rhythm: TEACH → CHECK → REINFORCE → ADVANCE

Follow this pattern for every exchange:

### When the student answers CORRECTLY:
1. Confirm briefly ("That's right")
2. TEACH a new related fact or insight they might not know (1 sentence of new knowledge)
3. Then ask a question about what you just taught

### When the student answers WRONG:
1. Don't just say "wrong" — EXPLAIN why in a way that teaches ("Actually, zero isn't included because natural numbers start at 1")
2. Give them a concrete example or analogy
3. Then ask a simpler version of the same question

### Progression:
- Start with basic definition questions (is X a natural number?)
- After 1-2 correct: teach a property, then check it (closure, smallest number)
- After 2-3 correct: teach an edge case distinction, then check it (natural vs whole numbers)
- After the student demonstrates understanding across these areas (minimum 3-4 exchanges with teaching), say EXACTLY: "I think you're ready. Let's start the quiz."
- If after 5-6 exchanges they're still struggling, say EXACTLY: "That's okay — let's try a question and see how it goes. Let's start the quiz."

## Response rules
- Every response should contain BOTH teaching AND a question. Never just ask a question without adding knowledge.
- Keep responses to 2-3 sentences: one teaching, one question.
- Make the student feel like they're learning something new each exchange, not being interrogated.
- Never start with "Sure", "Of course", "Absolutely". Jump straight in.`;
}

async function buildCatchupFirstMessage(config: CatchupConfig, lang: Lang): Promise<string> {
  const { topicName, conceptsCovered } = config;
  const langName = lang === 'ar' ? 'Arabic' : 'English';

  const prompt = lang === 'ar'
    ? `أنت معلم صوتي. اكتب جملة افتتاحية لجلسة مراجعة عن "${topicName}". المفهوم: ${conceptsCovered}. الجملة يجب أن: ١) تبدأ بـ "خلنا نراجع ${topicName}" ٢) تشرح المفهوم بجملة واحدة بسيطة ٣) تنتهي بسؤال بسيط واحد عن المفهوم. إجمالي ٣ جمل فقط. بالعربي. بدون تنسيق. نص عادي فقط.`
    : `You are a voice tutor. Write an opening line for a review session about "${topicName}". Concept: ${conceptsCovered}. The line must: 1) Start with "Let's review ${topicName}" 2) Explain the concept in one simple sentence 3) End with one simple question about the concept. Total 3 sentences only. Plain text, no formatting.`;

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
        max_tokens: 150,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    let text = data.content[0].text.trim();

    // Strip any markdown formatting the model might add
    text = text.replace(/[*_#`]/g, '').trim();

    // Accept any non-empty response — the system prompt guides the agent's behavior
    if (text.length > 10) {
      return text;
    }
    throw new Error('Generated message too short');
  } catch (err) {
    console.warn('First message generation failed, using template:', err);
    if (lang === 'ar') {
      return `خلنا نراجع ${topicName}. ${conceptsCovered}. هل تقدر تعطيني مثال على ${topicName}؟`;
    }
    return `Let's review ${topicName}. ${conceptsCovered}. Can you give me an example of ${topicName}?`;
  }
}

// Pre-configure catchup — call this early (e.g. on language select screen)
// Prefetch stores everything needed so startSession can fire immediately from a user gesture
let prefetchedCatchup: { firstMsg: string; signedUrl: string; lang: string } | null = null;
let catchupConfigPromise: Promise<void> | null = null;

export function prefetchCatchupConfig(config: CatchupConfig, lang: Lang) {
  prefetchedCatchup = null; // Clear stale prefetch from different language
  const catchupPrompt = buildCatchupContext(config, lang);
  catchupConfigPromise = (async () => {
    const [firstMsg, , signedUrl] = await Promise.all([
      buildCatchupFirstMessage(config, lang),
      fetch(`https://api.elevenlabs.io/v1/convai/agents/${getAgentId(lang)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': ELEVENLABS_KEY },
        body: JSON.stringify({
          conversation_config: {
            agent: {
              prompt: { prompt: catchupPrompt },
              first_message: '{{first_message}}',
            },
            turn: { turn_timeout: 30, mode: 'turn', turn_eagerness: 'eager' },
            vad: { background_voice_detection: true },
          },
        }),
      }),
      getSignedUrl(lang),
    ]);
    prefetchedCatchup = { firstMsg, signedUrl, lang };
  })().catch(err => console.warn('Failed to prefetch catchup config:', err));
}

export async function startCatchupSession(
  config: CatchupConfig,
  lang: Lang,
  callbacks: TutorSessionCallbacks,
) {
  let signedUrl: string;
  let catchupFirstMsg: string;

  if (prefetchedCatchup && prefetchedCatchup.lang === lang) {
    // Prefetched for correct language — NO async work
    console.log('[session] using PREFETCHED data — sync path, lang:', lang);
    signedUrl = prefetchedCatchup.signedUrl;
    catchupFirstMsg = prefetchedCatchup.firstMsg;
    prefetchedCatchup = null;
  } else {
    if (prefetchedCatchup) console.log('[session] prefetch lang mismatch:', prefetchedCatchup.lang, '!=', lang);
    prefetchedCatchup = null;
    // Wait for in-progress prefetch or fetch fresh
    if (catchupConfigPromise) {
      console.log('[session] waiting for prefetch...');
      await catchupConfigPromise;
    }
    if (prefetchedCatchup && prefetchedCatchup.lang === lang) {
      console.log('[session] prefetch completed — using data, lang:', lang);
      signedUrl = prefetchedCatchup.signedUrl;
      catchupFirstMsg = prefetchedCatchup.firstMsg;
      prefetchedCatchup = null;
    } else {
      console.log('[session] FALLBACK — fetching everything now');
    // Fallback: fetch everything now
    const catchupPrompt = buildCatchupContext(config, lang);
    const [fm, , url] = await Promise.all([
      buildCatchupFirstMessage(config, lang),
      fetch(`https://api.elevenlabs.io/v1/convai/agents/${getAgentId(lang)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': ELEVENLABS_KEY },
        body: JSON.stringify({
          conversation_config: {
            agent: {
              prompt: { prompt: catchupPrompt },
              first_message: '{{first_message}}',
            },
            turn: { turn_timeout: 30, mode: 'turn', turn_eagerness: 'eager' },
            vad: { background_voice_detection: true },
          },
        }),
      }),
      getSignedUrl(lang),
    ]);
    signedUrl = url;
    catchupFirstMsg = fm;
    }
  }
  catchupConfigPromise = null;

  console.log('[session] calling Conversation.startSession NOW');
  const conversation = await Conversation.startSession({
    signedUrl,
    dynamicVariables: { first_message: catchupFirstMsg },
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

  // Lower volume so echo cancellation can distinguish user voice from speaker
  conversation.setVolume({ volume: 0.35 });
  return conversation;
}
