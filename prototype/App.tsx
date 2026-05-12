import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { CrimsonPro_400Regular, CrimsonPro_600SemiBold } from '@expo-google-fonts/crimson-pro';
import { JetBrainsMono_400Regular, JetBrainsMono_600SemiBold } from '@expo-google-fonts/jetbrains-mono';
import { Vazirmatn_300Light, Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_600SemiBold, Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn';
import { useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  ThemeProvider, useTheme, VoiceTutor, ChatMessage, TypingIndicator,
  QuizOption, Button, BottomAction, SessionBar, WorkedExampleCard, VideoCard, Dialog, BreakdownCard, Icon, Input, FullSheet,
  DuneDynamic, sp, fs, fw, font, r, color,
} from '../rn';
import { QUESTIONS } from './questions';
import { startTutorSession, startCatchupSession, configureAgentForTutor, prefetchCatchupConfig, generateBreakdown, type TutorMode, type CatchupConfig } from './api';
import { t, type Lang } from './i18n';
import { startListening, stopListening } from './stt';
import * as analytics from './analytics';

type TutorState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';
type Screen = 'lang' | 'intro' | 'catchup' | 'quiz' | 'tutor' | 'results';

interface ConvoItem {
  from: 'tutor' | 'student';
  type?: 'message' | 'breakdown' | 'video' | 'worked-example';
  text: string;
  confirmed?: boolean;       // student: false = unconfirmed (italic), true = finalized
  revealedLength?: number;   // tutor: progressive word reveal. undefined = fully revealed
}

// ─── Main Quiz + Tutor App ──────────────────────────────────────

function TutorApp() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Language
  const [lang, setLang] = useState<Lang>('en');
  const isRTL = lang === 'ar';

  // Quiz state
  const [screen, setScreen] = useState<Screen>('lang');
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<('correct' | 'incorrect' | 'current' | 'pending')[]>(
    () => ['current', ...Array(QUESTIONS.length - 1).fill('pending')]
  );

  // Tutor state
  const [tutorState, setTutorState] = useState<TutorState>('idle');
  const [convo, setConvo] = useState<ConvoItem[]>([]);
  const [canRetry, setCanRetry] = useState(false);
  const [micError, setMicError] = useState(false);
  const conversationRef = useRef<any>(null);
  const scrollRef = useRef<ScrollView>(null);
  const revealTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isSpeakingRef = useRef(false);
  const liveTranscriptRef = useRef<string>(''); // current interim transcript
  const speakingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chunkSuppressedUntilRef = useRef(0); // suppress chunks briefly after user message confirmed

  const question = QUESTIONS[questionIdx];
  const { width: screenW, height: screenH } = useWindowDimensions();

  // iOS Safari audio fix:
  // 1) unmute-ios-audio: plays silent <audio> on user interaction → forces "media" channel (bypasses silent switch)
  // 2) unlockAudio: on button press, creates AudioContext + getUserMedia from gesture context.
  //    iOS requires BOTH an active AudioContext AND an active mic stream for Web Audio output to work.
  //    The ElevenLabs SDK creates these in parallel, but too late (after async calls).
  //    We pre-activate them from the button press so they're ready.
  const audioCtxRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Inline iOS detection + silent audio loop (unmute-ios-audio logic)
    const isIOS = navigator.maxTouchPoints > 0 && (window.AudioContext || (window as any).webkitAudioContext);
    if (isIOS) {
      const handler = () => {
        if (audioCtxRef.current?.state === 'running') return;
        // Play silent <audio> to activate media channel
        const a = document.createElement('audio');
        a.setAttribute('x-webkit-airplay', 'deny');
        a.preload = 'auto';
        a.loop = true;
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        const sr = (new AC()).sampleRate;
        const ab = new ArrayBuffer(10);
        const dv = new DataView(ab);
        dv.setUint32(0, sr, true); dv.setUint32(4, sr, true); dv.setUint16(8, 1, true);
        const mc = btoa(String.fromCharCode(...new Uint8Array(ab))).slice(0, 13);
        a.src = `data:audio/wav;base64,UklGRisAAABXQVZFZm10IBAAAAABAAEA${mc}AgAZGF0YQcAAACAgICAgICAAAA=`;
        a.load();
        a.play().then(() => console.log('[audio] iOS: silent audio playing (media channel active)')).catch(() => {});
        // Also resume AudioContext
        if (!audioCtxRef.current) audioCtxRef.current = new AC();
        audioCtxRef.current.resume();
        const buf = audioCtxRef.current.createBuffer(1, 1, 22050);
        const src2 = audioCtxRef.current.createBufferSource();
        src2.buffer = buf;
        src2.connect(audioCtxRef.current.destination);
        src2.start();
        (window as any).__elevenLabsAudioContext = audioCtxRef.current;
        // Pre-load AudioWorklet modules so they're cached when the SDK needs them
        const ctx2 = audioCtxRef.current;
        if (ctx2?.audioWorklet) {
          Promise.all([
            ctx2.audioWorklet.addModule('https://cdn.jsdelivr.net/npm/@alexanderolsen/libsamplerate-js@2.1.2/dist/libsamplerate.worklet.js'),
            import('@elevenlabs/client/dist/utils/audioConcatProcessor.generated.js').then(m => m.loadAudioConcatProcessor(ctx2.audioWorklet)).catch(() => {}),
          ]).then(() => console.log('[audio] pre-loaded all worklets')).catch(() => {
            console.log('[audio] pre-loaded libsamplerate (audioConcatProcessor will load at session start)');
          });
        }
        console.log('[audio] iOS: AudioContext + audio session activated from gesture');
      };
      ['click', 'touchend'].forEach(e => window.addEventListener(e, handler, { capture: true, passive: true }));
      console.log('[audio] iOS audio fix listeners registered');
    }
  }, []);

  const unlockAudio = useCallback(() => {
    try {
      // Resume persistent AudioContext from gesture
      if (audioCtxRef.current) {
        audioCtxRef.current.resume();
      } else {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AC();
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start();
      // Share this context with the SDK so it reuses our gesture-activated context
      (window as any).__elevenLabsAudioContext = ctx;
      console.log('[audio] unlockAudio: AudioContext state:', ctx.state);
    } catch {}
  }, []);

  // Init analytics + prefetch catchup config on mount
  useEffect(() => {
    analytics.initAnalytics();
    prefetchCatchupConfig({
      subjectName: 'Arithmetic',
      topicName: 'Natural Numbers',
      conceptsCovered: 'Natural number sets — definition of natural numbers, their basic properties, and operations on them',
    }, 'en'); // default — will be reconfigured if Arabic is selected
  }, []);

  // Word reveal: onMessage fires ~30ms after speech starts.
  // Reveal at ~280ms/word character-weighted. Matches ElevenLabs speech rate.
  const MS_PER_WORD = 280;

  // Unique ID for each tutor message to avoid stale index issues
  const msgIdRef = useRef(0);

  const startWordReveal = useCallback((text: string, onDone?: () => void) => {
    revealTimersRef.current.forEach(t => clearTimeout(t));
    revealTimersRef.current = [];

    const words = text.split(/\s+/);
    const totalChars = words.reduce((sum, w) => sum + w.length, 0);
    const totalDur = words.length * MS_PER_WORD;
    const msgId = ++msgIdRef.current;
    const newMsg = { from: 'tutor' as const, text, revealedLength: words[0].length, _id: msgId };

    // Add tutor message — always appended at the very end.
    // Use requestAnimationFrame to ensure any pending user message state updates are flushed first.
    requestAnimationFrame(() => {
      setConvo(prev => {
        // Remove chunks, fully reveal old tutor messages, confirm any unconfirmed students
        const cleaned = prev
          .filter(m => !(m.from === 'tutor' && (m as any)._chunk))
          .map(m => {
            if (m.from === 'tutor' && m.revealedLength !== undefined) return { ...m, revealedLength: undefined };
            if (m.from === 'student' && !m.confirmed) return { ...m, confirmed: true };
            return m;
          });
        return [...cleaned, newMsg as any];
      });
    });

    const updateMsg = (revealedLength: number | undefined) => {
      setConvo(prev => {
        const next = [...prev];
        for (let j = next.length - 1; j >= 0; j--) {
          if ((next[j] as any)._id === msgId) {
            next[j] = { ...next[j], revealedLength };
            return next;
          }
        }
        return prev;
      });
    };

    let elapsed = 0;
    words.forEach((word, wi) => {
      const dur = (word.length / totalChars) * totalDur;
      if (wi === 0) { elapsed += dur; return; }
      const timer = setTimeout(() => {
        updateMsg(words.slice(0, wi + 1).join(' ').length);
        if (wi === words.length - 1) {
          setTimeout(() => { updateMsg(undefined); onDone?.(); }, 100);
        }
      }, elapsed);
      revealTimersRef.current.push(timer);
      elapsed += dur;
    });

    if (words.length <= 1) {
      setTimeout(() => { updateMsg(undefined); onDone?.(); }, 100);
    }
  }, []);

  // Safety net: if agent stays in 'speaking' mode too long (audio didn't play on mobile),
  // force transition to 'listening' so the user isn't stuck.
  const armSpeakingTimeout = useCallback((text: string) => {
    if (speakingTimeoutRef.current) clearTimeout(speakingTimeoutRef.current);
    const words = text.split(/\s+/).length;
    const estimatedMs = words * MS_PER_WORD + 3000; // generous buffer
    speakingTimeoutRef.current = setTimeout(() => {
      if (isSpeakingRef.current) {
        console.warn('[safety] forcing mode to listening — agent stuck on speaking');
        setTutorState('listening');
        isSpeakingRef.current = false;
        handleModeForSTT('listening' as TutorMode);
      }
    }, estimatedMs);
  }, []);

  const clearSpeakingTimeout = useCallback(() => {
    if (speakingTimeoutRef.current) { clearTimeout(speakingTimeoutRef.current); speakingTimeoutRef.current = null; }
  }, []);

  // Agent mic is LIVE — ElevenLabs handles voice input directly.
  // Browser STT provides visual feedback (grey interim text).
  // ElevenLabs onMessage provides confirmed transcript (white text).
  const sttDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startSTT = useCallback(() => {
    if (typingModeRef.current) return;
    if (sttDelayRef.current) clearTimeout(sttDelayRef.current);
    liveTranscriptRef.current = '';
    let placeholderAdded = false;

    startListening(lang, (transcript) => {
      if (!transcript) return;
      if (!placeholderAdded) {
        placeholderAdded = true;
        setConvo(prev => [...prev, { from: 'student', text: transcript, confirmed: false }]);
      }
      liveTranscriptRef.current = transcript;
      setConvo(prev => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
          if (next[i].from === 'student' && !next[i].confirmed) {
            next[i] = { ...next[i], text: transcript };
            break;
          }
        }
        return next;
      });
    });
  }, [lang]);

  const handleModeForSTT = useCallback((mode: TutorMode) => {
    if (mode === 'listening') {
      // Pause word reveal — if user is interrupting, it'll be cancelled fully on onMessage:user
      // If it's just a mode flicker, the reveal state stays (timers paused but text position kept)
      revealTimersRef.current.forEach(t => clearTimeout(t));
      revealTimersRef.current = [];
      startSTT();
    } else {
      // Agent started speaking — stop STT but KEEP the placeholder
      // (onMessage for user role will replace it with confirmed text)
      if (sttDelayRef.current) { clearTimeout(sttDelayRef.current); sttDelayRef.current = null; }
      stopListening();
      liveTranscriptRef.current = '';
      // Suppress chunk previews — they cause flash above student message during interruptions
      chunkSuppressedUntilRef.current = Date.now() + 1000;
    }
  }, [lang, startSTT]);

  // Auto-scroll on new messages
  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
  }, [convo]);

  // ─── Quiz actions ───────────────────────────────────

  const prefetchConfigRef = useRef<Promise<void> | null>(null);

  const handleSubmit = useCallback(() => {
    if (!selectedOption) return;
    setSubmitted(true);
    const correct = selectedOption === question.correctLabel;
    setIsCorrect(correct);
    analytics.trackAnswerSubmitted(questionIdx, question.id, selectedOption, question.correctLabel, correct);
    if (correct) {
      setScore(s => s + 1);
      setResults(r => r.map((s, i) => i === questionIdx ? 'correct' : s));
    } else {
      setResults(r => r.map((s, i) => i === questionIdx ? 'incorrect' : s));
      prefetchConfigRef.current = configureAgentForTutor(question, selectedOption, lang);
    }
  }, [selectedOption, question, questionIdx, lang]);

  const handleNext = useCallback(() => {
    if (questionIdx + 1 >= QUESTIONS.length) {
      analytics.trackSessionCompleted(score + (isCorrect ? 0 : 0), QUESTIONS.length, results);
      setScreen('results');
    } else {
      analytics.trackQuestionViewed(questionIdx + 1, QUESTIONS[questionIdx + 1].id);
      setResults(r => r.map((s, i) => i === questionIdx + 1 ? 'current' : s));
      setQuestionIdx(i => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setIsCorrect(false);
    }
  }, [questionIdx, score, isCorrect, results]);

  const handleRestart = useCallback(() => {
    setQuestionIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setResults(['current', ...Array(QUESTIONS.length - 1).fill('pending')]);
    setScreen('quiz');
  }, []);

  // ─── Catchup session: concept overview ───────────────

  const [catchupReady, setCatchupReady] = useState(false);
  const [catchupTopic, setCatchupTopic] = useState('');
  const [catchupBreakdown, setCatchupBreakdown] = useState<{ title: string; points: string[] } | null>(null);
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const [showEndTutorWarning, setShowEndTutorWarning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [typingMode, setTypingMode] = useState(false);
  const [typingText, setTypingText] = useState('');
  const typingModeRef = useRef(false);

  // Pre-generate breakdown + prefetch ElevenLabs config on intro screen
  useEffect(() => {
    if (screen === 'intro') {
      setCatchupBreakdown(null); // Clear old breakdown when language changes
      const topicName = lang === 'ar' ? 'الأعداد الطبيعية' : 'Natural Numbers';
      const conceptsCovered = lang === 'ar'
        ? 'الأعداد الطبيعية — تعريف الأعداد الطبيعية، خصائصها الأساسية، والعمليات عليها'
        : 'Natural number sets — definition of natural numbers, their basic properties, and operations on them';
      const subjectName = lang === 'ar' ? 'الحساب' : 'Arithmetic';
      generateBreakdown(topicName, conceptsCovered, lang).then(bd => setCatchupBreakdown(bd)).catch(() => {});
      prefetchCatchupConfig({ subjectName, topicName, conceptsCovered }, lang);
    }
  }, [screen, lang]);

  const openCatchup = useCallback(async (overrideLang?: Lang) => {
    unlockAudio();
    const sessionLang = overrideLang || lang;
    analytics.trackCatchupStarted(sessionLang, 'Natural Numbers');
    setScreen('catchup');
    setConvo([]);
    setCatchupReady(false);
    setMicError(false);
    setTutorState('thinking');

    try {
      const catchupConfig: CatchupConfig = {
        subjectName: sessionLang === 'ar' ? 'الحساب' : 'Arithmetic',
        topicName: sessionLang === 'ar' ? 'الأعداد الطبيعية' : 'Natural Numbers',
        conceptsCovered: sessionLang === 'ar'
          ? 'الأعداد الطبيعية — تعريف الأعداد الطبيعية، خصائصها الأساسية، والعمليات عليها'
          : 'Natural number sets — definition of natural numbers, their basic properties, and operations on them',
      };
      setCatchupTopic(catchupConfig.topicName);
      console.log('[session] openCatchup: about to start session');
      // Re-resume persistent AudioContext right before session
      unlockAudio();

      const conversation = await startCatchupSession(
        catchupConfig,
        sessionLang,
        {
          onConnect: (id) => {
            console.log('Catchup connected:', id);
            setTutorState('speaking');
            startSTT(); // Start STT immediately so user can interrupt first message
          },
          onDisconnect: () => {
            setTutorState('idle');
            stopListening();
          },
          onModeChange: (mode: TutorMode) => {
            console.log('[catchup] mode:', mode);
            clearSpeakingTimeout();
            setTutorState(mode === 'speaking' ? 'speaking' : 'listening');
            isSpeakingRef.current = mode === 'speaking';
            handleModeForSTT(mode);
          },
          onAgentChunk: () => {
            // Disabled — word reveal from onMessage provides the visual feedback.
            // Chunks caused a flash where the tutor response briefly appeared above the student's interruption.
          },
          onMessage: (text: string, role: 'user' | 'agent') => {
            console.log('[catchup] message:', role, text?.substring(0, 40));
            if (!text) return;
            if (role === 'agent') {
              armSpeakingTimeout(text);
              analytics.trackCatchupMessage('agent', text, 'voice');
              const lower = text.toLowerCase();
              const isTrigger =
                lower.includes("let's start the quiz") ||
                lower.includes("let's try a question") ||
                lower.includes("you're ready") ||
                lower.includes('يلا نبدأ الاختبار') ||
                lower.includes('جاهز') ||
                lower.includes('نجرب سؤال') ||
                lower.includes('ما عليك');
              startWordReveal(text, isTrigger ? () => {
                setTimeout(() => {
                  setCatchupReady(true);
                  analytics.trackCatchupCompleted(convo.length);
                  setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
                  if (sttDelayRef.current) { clearTimeout(sttDelayRef.current); sttDelayRef.current = null; }
                  stopListening();
                  // Session ended
                  setTimeout(() => {
                    if (conversationRef.current) {
                      try { conversationRef.current.endSession(); } catch {}
                      conversationRef.current = null;
                    }
                  }, 1000);
                }, 500);
              } : undefined);
            } else {
              analytics.trackCatchupMessage('user', text, typingModeRef.current ? 'text' : 'voice');
              chunkSuppressedUntilRef.current = Date.now() + 500;
              // Cancel word reveal and fully reveal the interrupted tutor message
              revealTimersRef.current.forEach(t => clearTimeout(t));
              revealTimersRef.current = [];
              setConvo(prev => prev.map(m => m.from === 'tutor' && m.revealedLength !== undefined ? { ...m, revealedLength: undefined } : m));
              setConvo(prev => {
                const next = [...prev];
                for (let i = next.length - 1; i >= 0; i--) {
                  if (next[i].from === 'student' && !next[i].confirmed) {
                    next[i] = { ...next[i], text, confirmed: true };
                    return next;
                  }
                }
                return [...prev, { from: 'student', text, confirmed: true }];
              });
            }
          },
          onAudioAlignment: (chars: string[], startTimesMs: number[], durationsMs: number[]) => {
            const now = Date.now();
            for (let i = 0; i < chars.length; i++) {
              const delay = Math.max(0, startTimesMs[i]);
              const charCount = chars.slice(0, i + 1).join('').length;
              const timer = setTimeout(() => {
                setConvo(prev => {
                  const next = [...prev];
                  for (let j = next.length - 1; j >= 0; j--) {
                    if (next[j].from === 'tutor' && next[j].revealedLength !== undefined) {
                      next[j] = { ...next[j], revealedLength: Math.max(next[j].revealedLength ?? 0, charCount) };
                      return next;
                    }
                  }
                  return prev;
                });
              }, delay);
              revealTimersRef.current.push(timer);
            }
            // Fully reveal after last char
            if (startTimesMs.length > 0) {
              const lastEnd = startTimesMs[startTimesMs.length - 1] + (durationsMs[durationsMs.length - 1] || 0);
              const timer = setTimeout(() => {
                setConvo(prev => {
                  const next = [...prev];
                  for (let j = next.length - 1; j >= 0; j--) {
                    if (next[j].from === 'tutor' && next[j].revealedLength !== undefined) {
                      next[j] = { ...next[j], revealedLength: undefined };
                      return next;
                    }
                  }
                  return prev;
                });
              }, lastEnd + 100);
              revealTimersRef.current.push(timer);
            }
          },
          onError: (msg: string) => {
            console.error('Catchup error:', msg);
            setTutorState('error');
          },
          onStatusChange: (status: string) => {
            console.log('Catchup status:', status);
          },
        },
      );
      conversationRef.current = conversation;
    } catch (err: any) {
      console.error('Failed to start catchup:', err);
      if (err?.name === 'NotAllowedError' || err?.message?.includes('Permission denied')) {
        setMicError(true);
      }
      setTutorState('error');
    }
  }, [lang]);

  // ─── Tutor session via ElevenLabs Agent ─────────────

  const openTutor = useCallback(async () => {
    unlockAudio();
    analytics.trackTutorOpened(questionIdx, question.id);
    setScreen('tutor');
    setConvo([]);
    setCanRetry(false);
    setMicError(false);
    setTutorState('thinking');

    try {
      const prefetch = prefetchConfigRef.current;
      prefetchConfigRef.current = null;
      unlockAudio();

      const conversation = await startTutorSession(
        question,
        selectedOption!,
        lang,
        {
          onConnect: (id) => {
            console.log('Tutor connected:', id);
            setTutorState('speaking');
            startSTT();
          },
          onDisconnect: () => {
            console.log('Tutor disconnected');
            setTutorState('idle');
            stopListening();
          },
          onModeChange: (mode: TutorMode) => {
            console.log('[tutor] mode:', mode);
            clearSpeakingTimeout();
            setTutorState(mode === 'speaking' ? 'speaking' : 'listening');
            isSpeakingRef.current = mode === 'speaking';
            handleModeForSTT(mode);
          },
          onAgentChunk: () => {
            // Disabled in tutor — word reveal from onMessage provides the visual feedback.
            // Chunks caused a flash where the tutor response briefly appeared above the student's interruption.
          },
          onMessage: (text: string, role: 'user' | 'agent') => {
            console.log('[tutor] message:', role, text?.substring(0, 40));
            if (!text) return;
            if (role === 'agent') {
              armSpeakingTimeout(text);
              analytics.trackTutorMessage('agent', text, 'voice', questionIdx);
              const lower = text.toLowerCase();
              const isTrigger =
                lower.includes("you've got it") ||
                lower.includes("let's move on") ||
                lower.includes('now you know') ||
                lower.includes('أحسنت، فهمتها') ||
                lower.includes('أحسنت') ||
                lower.includes('الحين عرفت') ||
                lower.includes('يلا ننتقل');
              startWordReveal(text, isTrigger ? () => {
                setCanRetry(true);
                analytics.trackTutorCompleted(questionIdx, convo.length);
                if (sttDelayRef.current) { clearTimeout(sttDelayRef.current); sttDelayRef.current = null; }
                stopListening();
                setTimeout(() => {
                  if (conversationRef.current) {
                    try { conversationRef.current.endSession(); } catch {}
                    conversationRef.current = null;
                  }
                }, 500);
              } : undefined);
            } else {
              analytics.trackTutorMessage('user', text, typingModeRef.current ? 'text' : 'voice', questionIdx);
              chunkSuppressedUntilRef.current = Date.now() + 500;
              // Cancel word reveal and fully reveal the interrupted tutor message
              revealTimersRef.current.forEach(t => clearTimeout(t));
              revealTimersRef.current = [];
              setConvo(prev => prev.map(m => m.from === 'tutor' && m.revealedLength !== undefined ? { ...m, revealedLength: undefined } : m));
              setConvo(prev => {
                const next = [...prev];
                for (let i = next.length - 1; i >= 0; i--) {
                  if (next[i].from === 'student' && !next[i].confirmed) {
                    next[i] = { ...next[i], text, confirmed: true };
                    return next;
                  }
                }
                return [...prev, { from: 'student', text, confirmed: true }];
              });
            }
          },
          onAudioAlignment: (chars: string[], startTimesMs: number[], durationsMs: number[]) => {
            const now = Date.now();
            for (let i = 0; i < chars.length; i++) {
              const delay = Math.max(0, startTimesMs[i]);
              const charCount = chars.slice(0, i + 1).join('').length;
              const timer = setTimeout(() => {
                setConvo(prev => {
                  const next = [...prev];
                  for (let j = next.length - 1; j >= 0; j--) {
                    if (next[j].from === 'tutor' && next[j].revealedLength !== undefined) {
                      next[j] = { ...next[j], revealedLength: Math.max(next[j].revealedLength ?? 0, charCount) };
                      return next;
                    }
                  }
                  return prev;
                });
              }, delay);
              revealTimersRef.current.push(timer);
            }
            // Fully reveal after last char
            if (startTimesMs.length > 0) {
              const lastEnd = startTimesMs[startTimesMs.length - 1] + (durationsMs[durationsMs.length - 1] || 0);
              const timer = setTimeout(() => {
                setConvo(prev => {
                  const next = [...prev];
                  for (let j = next.length - 1; j >= 0; j--) {
                    if (next[j].from === 'tutor' && next[j].revealedLength !== undefined) {
                      next[j] = { ...next[j], revealedLength: undefined };
                      return next;
                    }
                  }
                  return prev;
                });
              }, lastEnd + 100);
              revealTimersRef.current.push(timer);
            }
          },
          onError: (message: string) => {
            console.error('Tutor error:', message);
            setTutorState('error');
            setTimeout(() => setTutorState('idle'), 2000);
          },
          onStatusChange: (status: string) => {
            console.log('Tutor status:', status);
          },
        },
        prefetch || undefined,
      );

      conversationRef.current = conversation;
    } catch (err: any) {
      console.error('Failed to start tutor session:', err);
      if (err?.name === 'NotAllowedError' || err?.message?.includes('Permission denied')) {
        setMicError(true);
      }
      setTutorState('error');
    }
  }, [question, selectedOption, lang]);

  const closeTutor = useCallback(async () => {
    stopListening();
    revealTimersRef.current.forEach(t => clearTimeout(t));
    revealTimersRef.current = [];
    if (conversationRef.current) {
      try { await conversationRef.current.endSession(); } catch {}
      conversationRef.current = null;
    }
    // Stop silent audio so user can fully control volume
    // Session ended
    setScreen('quiz');
    setSelectedOption(null);
    setSubmitted(false);
    setIsCorrect(false);
    setTutorState('idle');
    setConvo([]);
  }, []);

  // ─── Language toggle ───────────────────────────────

  const toggleLang = useCallback(() => {
    setLang(l => l === 'en' ? 'ar' : 'en');
  }, []);

  // ─── Option state helper ───────────────────────────

  const optionState = (label: string): 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled' => {
    if (!submitted) return label === selectedOption ? 'selected' : 'default';
    if (isCorrect && label === question.correctLabel) return 'correct';
    if (label === selectedOption && !isCorrect) return 'incorrect';
    return 'disabled';
  };

  // ─── Render ────────────────────────────────────────

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: insets.top, direction: isRTL ? 'rtl' : 'ltr' } as any}>
      {/* ── Top bar ── */}
      {screen !== 'lang' && screen !== 'intro' && (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: sp[3],
          paddingHorizontal: sp[5],
          borderBottomWidth: 1,
          borderBottomColor: theme.divider,
        }}>
          <Text style={{ fontFamily: font.sans, fontSize: fs[15], fontWeight: fw[500], color: theme.fg }}>
            {screen === 'results'
              ? (lang === 'en' ? 'Results' : 'النتائج')
              : screen === 'catchup'
                ? (lang === 'en' ? `${catchupTopic} Catchup` : `مراجعة ${catchupTopic}`)
              : screen === 'tutor'
                ? (lang === 'en' ? 'Tutor Session' : 'جلسة المعلم')
                : (lang === 'en' ? 'Natural Numbers' : 'الأعداد الطبيعية')
            }
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
            {screen === 'quiz' && (
              <Pressable onPress={() => setShowExitWarning(true)}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fgSubtle }}>
                  {lang === 'en' ? 'Exit Session' : 'الخروج من الجلسة'}
                </Text>
              </Pressable>
            )}
            {screen === 'catchup' && (
              <Pressable onPress={() => setShowSkipWarning(true)}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fgSubtle }}>
                  {lang === 'en' ? 'Skip Review' : 'تخطي المراجعة'}
                </Text>
              </Pressable>
            )}
            {screen === 'tutor' && (
              <Pressable onPress={() => { analytics.trackTutorSkipped(questionIdx); closeTutor(); handleNext(); }}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fgSubtle }}>
                  {lang === 'en' ? 'Skip Tutor' : 'تخطي المعلم'}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      )}

      {/* ── Language selection ── */}
      {screen === 'lang' && (
        <View style={{ flex: 1 }}>
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: screenH * 0.4, opacity: 0.6 }}>
            <DuneDynamic width={screenW} height={screenH * 0.4} layers={6} contrast={1.8} density={1.2} />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: sp[8], gap: sp[6] }}>
            <Svg width={200} height={92} viewBox="0 0 140 64" fill="none">
              <Path d="M82.7222 21.2108C76.868 21.2108 72.1168 25.962 72.1168 31.8162C72.1168 37.6704 76.868 42.4217 82.7222 42.4217C88.5764 42.4217 93.3277 37.6704 93.3277 31.8162C93.3277 25.962 88.5764 21.2108 82.7222 21.2108ZM82.7222 38.9007C78.8194 38.9007 75.6378 35.719 75.6378 31.8162C75.6378 27.9134 78.8194 24.7318 82.7222 24.7318C86.625 24.7318 89.8067 27.9134 89.8067 31.8162C89.8067 35.719 86.625 38.9007 82.7222 38.9007Z" fill={theme.fg} />
              <Path d="M57.2692 21.2108C51.415 21.2108 46.6638 25.962 46.6638 31.8162C46.6638 37.6704 51.415 42.4217 57.2692 42.4217C63.1234 42.4217 67.8747 37.6704 67.8747 31.8162C67.8747 25.962 63.1234 21.2108 57.2692 21.2108Z" fill={color.noon[400]} />
              <Path d="M31.8162 21.2108C25.962 21.2108 21.2108 25.962 21.2108 31.8162V41.149C21.2108 41.6156 21.5926 41.9974 22.0592 41.9974H23.8834C24.35 41.9974 24.7318 41.6156 24.7318 41.149V31.8162C24.7318 27.9134 27.9134 24.7318 31.8162 24.7318C35.719 24.7318 38.9007 27.9134 38.9007 31.8162V41.149C38.9007 41.6156 39.2824 41.9974 39.7491 41.9974H41.5732C42.0399 41.9974 42.4217 41.6156 42.4217 41.149V31.8162C42.4217 25.962 37.6704 21.2108 31.8162 21.2108Z" fill={theme.fg} />
              <Path d="M108.175 21.2108C102.321 21.2108 97.5698 25.962 97.5698 31.8162V41.149C97.5698 41.6156 97.9516 41.9974 98.4183 41.9974H100.242C100.709 41.9974 101.091 41.6156 101.091 41.149V31.8162C101.091 27.9134 104.272 24.7318 108.175 24.7318C112.078 24.7318 115.26 27.9134 115.26 31.8162V41.149C115.26 41.6156 115.641 41.9974 116.108 41.9974H117.932C118.399 41.9974 118.781 41.6156 118.781 41.149V31.8162C118.781 25.962 114.029 21.2108 108.175 21.2108Z" fill={theme.fg} />
              <Path d="M57.0995 36.9068C60.3236 40.046 65.6263 40.046 68.8503 36.9068C69.3594 36.3978 68.511 35.7614 68.0868 36.2281C65.2869 38.9855 60.7478 38.9855 57.9056 36.2281C57.4389 35.7614 56.5905 36.3978 57.0995 36.9068Z" fill={theme.fg} />
            </Svg>
            <Text style={{ fontFamily: font.sans, fontSize: fs[15], color: theme.fgMuted }}>
              Choose your language
            </Text>
            <View style={{ flexDirection: 'row', gap: sp[4], marginTop: sp[4] }}>
              <Button variant="secondary" onPress={() => { unlockAudio(); setLang('en'); setScreen('intro'); analytics.trackLangSelected('en'); }}>
                English
              </Button>
              <Button variant="secondary" onPress={() => { unlockAudio(); setLang('ar'); setScreen('intro'); analytics.trackLangSelected('ar'); }}>
                العربية
              </Button>
            </View>
          </View>
        </View>
      )}

      {/* ── Intro screen ── */}
      {screen === 'intro' && (
        <View style={{ flex: 1, justifyContent: 'center', padding: sp[8], maxWidth: 600, width: '100%', alignSelf: 'center' as any }}>
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 1, textTransform: 'uppercase', marginBottom: sp[3] }}>
            {lang === 'en' ? 'Practice Session' : 'جلسة تدريب'}
          </Text>
          <Text style={{ fontFamily: font.serif, fontSize: fs[28], fontWeight: fw[500], color: theme.fg, marginBottom: sp[6] }}>
            {lang === 'en' ? 'Natural Numbers' : 'الأعداد الطبيعية'}
          </Text>

          <View style={{ gap: sp[3], marginBottom: sp[6] }}>
            <View style={{ flexDirection: 'row', gap: sp[3] }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgFaint, width: 70 }}>
                {lang === 'en' ? 'Chapter' : 'الفصل'}
              </Text>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fg }}>
                {lang === 'en' ? 'Arithmetic' : 'الحساب'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: sp[3] }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgFaint, width: 70 }}>
                {lang === 'en' ? 'Topic' : 'الموضوع'}
              </Text>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fg }}>
                {lang === 'en' ? 'Numbers and their properties' : 'الاعداد و خصائصها'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: sp[3] }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgFaint, width: 70 }}>
                {lang === 'en' ? 'Subtopic' : 'الفرعي'}
              </Text>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fg }}>
                {lang === 'en' ? 'Natural Numbers' : 'الأعداد الطبيعية'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: sp[3] }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgFaint, width: 70 }}>
                {lang === 'en' ? 'Questions' : 'الأسئلة'}
              </Text>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[700], color: theme.accent }}>
                {QUESTIONS.length}
              </Text>
            </View>
          </View>
        </View>
      )}

      {screen === 'intro' && (
        <BottomAction
          icon="tutor"
          message={lang === 'en' ? "You haven't visited this in a while" : 'لم تزر هذا الموضوع منذ فترة'}
          submessage={lang === 'en' ? "We'll start with a quick review" : 'سنبدأ بمراجعة سريعة'}
          primary={{ label: lang === 'en' ? 'Start Practice' : 'ابدأ التدريب', onPress: () => { unlockAudio(); openCatchup(lang); } }}
        />
      )}

      {/* ── Catchup screen ── */}
      {screen === 'catchup' && (
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], gap: sp[5], paddingBottom: sp[8], maxWidth: 600, width: '100%', alignSelf: 'center' }}
        >
          {/* Concept breakdown — shown at the top */}
          {catchupBreakdown && (
            <BreakdownCard title={catchupBreakdown.title} points={catchupBreakdown.points} />
          )}

          {convo.map((item, i) => (
            <ChatMessage
              key={i}
              from={item.from}
              confirmed={item.from === 'student' ? item.confirmed : undefined}
              revealedLength={item.from === 'tutor' ? item.revealedLength : undefined}
              rtl={isRTL}
            >
              {item.text}
            </ChatMessage>
          ))}
          {tutorState === 'thinking' && <ChatMessage from="tutor" thinking rtl={isRTL}>{''}</ChatMessage>}

          {/* Resources appear once catchup is complete */}
          {catchupReady && (
            <View style={{ alignSelf: 'flex-start', width: '80%', gap: sp[3] }}>
              <WorkedExampleCard
                title={lang === 'en' ? `${catchupTopic} in Practice` : `${catchupTopic} في التطبيق`}
                steps={[
                  { title: lang === 'en' ? 'Definition' : 'التعريف', content: lang === 'en' ? 'Natural numbers are the counting numbers starting from 1: {1, 2, 3, 4, ...}. They do not include zero or negative numbers.' : 'الأعداد الطبيعية هي أعداد العد بدءاً من ١: {١، ٢، ٣، ٤، ...}. لا تشمل الصفر أو الأعداد السالبة.' },
                  { title: lang === 'en' ? 'Properties' : 'الخصائص', content: lang === 'en' ? 'Natural numbers are closed under addition and multiplication — adding or multiplying two natural numbers always gives a natural number.' : 'الأعداد الطبيعية مغلقة تحت الجمع والضرب — جمع أو ضرب عددين طبيعيين دائماً يعطي عدد طبيعي.' },
                  { title: lang === 'en' ? 'Key distinction' : 'التمييز الرئيسي', content: lang === 'en' ? 'Whole numbers include zero {0, 1, 2, 3, ...} while natural numbers start from 1. This is a common exam question.' : 'الأعداد الكلية تشمل الصفر {٠، ١، ٢، ٣، ...} بينما الأعداد الطبيعية تبدأ من ١. هذا سؤال شائع في الاختبارات.' },
                ]}
              />
              <VideoCard
                title={lang === 'en' ? `Understanding ${catchupTopic}` : `فهم ${catchupTopic}`}
                attribution={lang === 'en' ? 'Noon Academy' : 'أكاديمية نون'}
                duration="3:20"
                uri="https://www.youtube.com/watch?v=eVxye1A2wL0"
              />
            </View>
          )}
        </ScrollView>
      )}

      {/* ── Session progress bar ── */}
      {screen === 'quiz' && (
        <View style={{ paddingHorizontal: sp[5], paddingTop: sp[3] }}>
          <SessionBar segments={results} size="sm" />
        </View>
      )}

      {/* ── Quiz screen ── */}
      {screen === 'quiz' && (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], gap: sp[4], maxWidth: 600, width: '100%', alignSelf: 'center' }}>
          {question.text[lang] ? (
            <Text style={{
              fontFamily: font.sans, fontSize: fs[18], fontWeight: fw[600],
              color: theme.fg, lineHeight: fs[18] * 1.5,
            }}>
              {question.text[lang]}
            </Text>
          ) : null}

          {question.image && (
            <Image
              source={{ uri: question.image }}
              style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: r[2], backgroundColor: theme.hoverOverlay }}
              resizeMode="contain"
            />
          )}

          <View style={{ gap: sp[3], marginTop: sp[3] }}>
            {question.options.map(opt => (
              <QuizOption
                key={opt.label}
                label={opt.label}
                text={opt.text[lang]}
                state={optionState(opt.label)}
                onPress={() => { if (!submitted) { setSelectedOption(opt.label); analytics.trackAnswerSelected(questionIdx, question.id, opt.label); } }}
              />
            ))}
          </View>

        </ScrollView>
      )}

      {/* ── Tutor screen ── */}
      {screen === 'tutor' && (
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], gap: sp[5], paddingBottom: sp[8], maxWidth: 600, width: '100%', alignSelf: 'center' }}>
          {/* Question context card with all options */}
          <View style={{
            padding: sp[4], borderRadius: r[3],
            backgroundColor: theme.inputBg,
            borderWidth: 1, borderColor: theme.border,
            gap: sp[3],
          }}>
            {question.text[lang] ? (
              <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, lineHeight: fs[14] * 1.5 }}>
                {question.text[lang]}
              </Text>
            ) : null}
            {question.image && (
              <Image source={{ uri: question.image }} style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: r[2] }} resizeMode="contain" />
            )}
            <View style={{ gap: sp[2] }}>
              {question.options.map(opt => (
                <QuizOption
                  key={opt.label}
                  label={opt.label}
                  text={opt.text[lang]}
                  state={opt.label === selectedOption ? 'incorrect' : opt.label === question.correctLabel ? 'default' : 'default'}
                />
              ))}
            </View>
          </View>

          {convo.map((item, i) => (
            <ChatMessage
              key={i}
              from={item.from}
              confirmed={item.from === 'student' ? item.confirmed : undefined}
              revealedLength={item.from === 'tutor' ? item.revealedLength : undefined}
              rtl={isRTL}
            >
              {item.text}
            </ChatMessage>
          ))}
          {tutorState === 'thinking' && <ChatMessage from="tutor" thinking rtl={isRTL}>{''}</ChatMessage>}
        </ScrollView>
      )}

      {/* ── Results screen ── */}
      {screen === 'results' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: sp[8], gap: sp[5] }}>
          <Text style={{ fontFamily: font.sans, fontSize: fs[28], fontWeight: fw[700], color: theme.fg }}>
            {t.quizComplete[lang]}
          </Text>
          <Text style={{ fontFamily: font.sans, fontSize: fs[20], color: theme.fgMuted }}>
            {t.score[lang](score, QUESTIONS.length)}
          </Text>
          <View style={{
            width: 120, height: 120, borderRadius: 60,
            backgroundColor: theme.accentSoft, alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[32], fontWeight: fw[700], color: theme.accent }}>
              {Math.round((score / QUESTIONS.length) * 100)}%
            </Text>
          </View>
          <View style={{ width: '100%', maxWidth: 400, paddingTop: sp[3] }}>
            <SessionBar segments={results} size="sm" />
          </View>
        </View>
      )}

      {/* ── Bottom actions ── */}
      {screen === 'quiz' && !submitted && (
        <BottomAction
          primary={{ label: t.submit[lang], onPress: handleSubmit, disabled: !selectedOption }}
        />
      )}

      {screen === 'quiz' && submitted && isCorrect && (
        <BottomAction
          icon="check"
          message={t.correct[lang]}
          messageVariant="accent"
          primary={{ label: questionIdx + 1 >= QUESTIONS.length ? (lang === 'en' ? 'See Results' : 'عرض النتائج') : t.next[lang], onPress: handleNext }}
        />
      )}

      {screen === 'quiz' && submitted && !isCorrect && (
        <BottomAction
          icon="close"
          message={t.incorrect[lang]}
          messageVariant="danger"
          primary={{ label: t.talkToTutor[lang], onPress: openTutor, variant: 'tutor' }}
          secondary={{ label: lang === 'en' ? 'View Explanation' : 'عرض الشرح', onPress: () => { setShowExplanation(true); analytics.trackExplanationOpened(questionIdx, question.id); } }}
        />
      )}

      {screen === 'catchup' && !catchupReady && (
        <View style={{ borderTopWidth: 1, borderTopColor: theme.divider }}>
        <View style={{
          alignItems: 'center',
          paddingTop: sp[3],
          paddingBottom: Math.max(sp[4], insets.bottom),
          paddingHorizontal: sp[5],
          maxWidth: 600, width: '100%', alignSelf: 'center' as any,
        }}>
          {micError ? (
            <View style={{ alignItems: 'center', gap: sp[3], paddingVertical: sp[2] }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, textAlign: 'center' }}>
                {lang === 'en' ? 'Microphone access is needed for the voice tutor.' : 'يحتاج المعلم الصوتي إذن الميكروفون.'}
              </Text>
              <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, textAlign: 'center' }}>
                {lang === 'en' ? 'Allow microphone in your browser settings, then tap retry.' : 'اسمح بالميكروفون في إعدادات المتصفح، ثم اضغط إعادة المحاولة.'}
              </Text>
              <View style={{ flexDirection: 'row', gap: sp[3] }}>
                <Button onPress={() => { setMicError(false); openCatchup(); }}>
                  {lang === 'en' ? 'Retry' : 'إعادة المحاولة'}
                </Button>
                <Button variant="ghost" onPress={() => { setMicError(false); setScreen('quiz'); }}>
                  {lang === 'en' ? 'Skip to Quiz' : 'تخطي للاختبار'}
                </Button>
              </View>
            </View>
          ) : typingMode ? (
            <>
              {/* Keyboard mode — tutor button + text input + send */}
              <View style={{ flexDirection: 'row', gap: sp[2], width: '100%', alignItems: 'center' }}>
                <Pressable
                  onPress={() => {
                    analytics.trackModeSwitch('voice', screen);
                    console.log('[MODE] switching to voice');
                    setTypingMode(false);
                    typingModeRef.current = false;
                    setTypingText('');
                    conversationRef.current?.setMicMuted(false);
                    handleModeForSTT('listening' as TutorMode);
                  }}
                >
                  <VoiceTutor state="idle" size={40} hideLabel />
                </Pressable>
                <View style={{ flex: 1 }}>
                  <Input
                    value={typingText}
                    onChangeText={setTypingText}
                    placeholder={lang === 'en' ? 'Send a message' : 'أرسل رسالة'}
                    autoFocus
                    returnKeyType="send"
                    onSubmitEditing={() => {
                      if (typingText.trim()) {
                        setConvo(prev => [...prev, { from: 'student', text: typingText.trim(), confirmed: true }]);
                        conversationRef.current?.sendUserMessage(typingText.trim());
                        setTypingText('');
                      }
                    }}
                  />
                </View>
                <Button
                  disabled={!typingText.trim()}
                  onPress={() => {
                    if (typingText.trim()) {
                      setConvo(prev => [...prev, { from: 'student', text: typingText.trim(), confirmed: true }]);
                      conversationRef.current?.sendUserMessage(typingText.trim());
                      setTypingText('');
                    }
                  }}
                >
                  {lang === 'en' ? 'Send' : 'إرسال'}
                </Button>
              </View>
            </>
          ) : (
            <>
              {/* Voice mode (default) — aura + switch to keyboard */}
              <VoiceTutor state={tutorState} size={64} />
              <Pressable
                onPress={() => { analytics.trackModeSwitch('text', screen); console.log('[MODE] switching to text'); setTypingMode(true); typingModeRef.current = true; stopListening(); conversationRef.current?.setMicMuted(true); }}
                style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2], marginTop: sp[3] }}
              >
                <Icon name="keyboard" size={14} color={theme.fgFaint} />
                <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint }}>
                  {lang === 'en' ? 'Switch to text' : 'التبديل للكتابة'}
                </Text>
              </Pressable>
            </>
          )}
        </View>
        </View>
      )}

      {screen === 'catchup' && catchupReady && (
        <BottomAction
          message={lang === 'en' ? 'Review the resources above if you need a refresher before starting.' : 'راجع المواد أعلاه إذا تحتاج مراجعة قبل البدء.'}
          primary={{ label: lang === 'en' ? 'Start Quiz' : 'ابدأ الاختبار', onPress: () => { analytics.trackSessionStarted(lang, QUESTIONS.length); analytics.trackQuestionViewed(0, QUESTIONS[0].id); setScreen('quiz'); } }}
        />
      )}

      {screen === 'tutor' && !canRetry && (
        <View style={{ borderTopWidth: 1, borderTopColor: theme.divider }}>
        <View style={{
          alignItems: 'center',
          paddingTop: sp[3],
          paddingBottom: Math.max(sp[4], insets.bottom),
          paddingHorizontal: sp[5],
          maxWidth: 600, width: '100%', alignSelf: 'center' as any,
        }}>
          {micError ? (
            <View style={{ alignItems: 'center', gap: sp[3], paddingVertical: sp[2] }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, textAlign: 'center' }}>
                {lang === 'en' ? 'Microphone access is needed for the voice tutor.' : 'يحتاج المعلم الصوتي إذن الميكروفون.'}
              </Text>
              <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, textAlign: 'center' }}>
                {lang === 'en' ? 'Allow microphone in your browser settings, then tap retry.' : 'اسمح بالميكروفون في إعدادات المتصفح، ثم اضغط إعادة المحاولة.'}
              </Text>
              <View style={{ flexDirection: 'row', gap: sp[3] }}>
                <Button onPress={() => { setMicError(false); openTutor(); }}>
                  {lang === 'en' ? 'Retry' : 'إعادة المحاولة'}
                </Button>
                <Button variant="ghost" onPress={() => { setMicError(false); handleNext(); }}>
                  {lang === 'en' ? 'Skip' : 'تخطي'}
                </Button>
              </View>
            </View>
          ) : typingMode ? (
            <>
              {/* Keyboard mode — tutor button + text input + send */}
              <View style={{ flexDirection: 'row', gap: sp[2], width: '100%', alignItems: 'center' }}>
                <Pressable
                  onPress={() => {
                    analytics.trackModeSwitch('voice', screen);
                    console.log('[MODE] switching to voice');
                    setTypingMode(false);
                    typingModeRef.current = false;
                    setTypingText('');
                    conversationRef.current?.setMicMuted(false);
                    handleModeForSTT('listening' as TutorMode);
                  }}
                >
                  <VoiceTutor state="idle" size={40} hideLabel />
                </Pressable>
                <View style={{ flex: 1 }}>
                  <Input
                    value={typingText}
                    onChangeText={setTypingText}
                    placeholder={lang === 'en' ? 'Send a message' : 'أرسل رسالة'}
                    autoFocus
                    returnKeyType="send"
                    onSubmitEditing={() => {
                      if (typingText.trim()) {
                        setConvo(prev => [...prev, { from: 'student', text: typingText.trim(), confirmed: true }]);
                        conversationRef.current?.sendUserMessage(typingText.trim());
                        setTypingText('');
                      }
                    }}
                  />
                </View>
                <Button
                  disabled={!typingText.trim()}
                  onPress={() => {
                    if (typingText.trim()) {
                      setConvo(prev => [...prev, { from: 'student', text: typingText.trim(), confirmed: true }]);
                      conversationRef.current?.sendUserMessage(typingText.trim());
                      setTypingText('');
                    }
                  }}
                >
                  {lang === 'en' ? 'Send' : 'إرسال'}
                </Button>
              </View>
            </>
          ) : (
            <>
              {/* Voice mode (default) — aura + switch to keyboard */}
              <VoiceTutor state={tutorState} size={64} />
              <Pressable
                onPress={() => { analytics.trackModeSwitch('text', screen); console.log('[MODE] switching to text'); setTypingMode(true); typingModeRef.current = true; stopListening(); conversationRef.current?.setMicMuted(true); }}
                style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2], marginTop: sp[3] }}
              >
                <Icon name="keyboard" size={14} color={theme.fgFaint} />
                <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint }}>
                  {lang === 'en' ? 'Switch to text' : 'التبديل للكتابة'}
                </Text>
              </Pressable>
            </>
          )}
        </View>
        </View>
      )}

      {screen === 'tutor' && canRetry && (
        <BottomAction
          primary={{ label: questionIdx + 1 >= QUESTIONS.length ? (lang === 'en' ? 'See Results' : 'عرض النتائج') : (lang === 'en' ? 'Try one similar' : 'جرب سؤال مشابه'), onPress: () => { closeTutor(); handleNext(); } }}
        />
      )}

      {screen === 'results' && (
        <BottomAction
          primary={{ label: lang === 'en' ? 'Go Home' : 'الرئيسية', onPress: () => {
            analytics.trackSessionCompleted(score, QUESTIONS.length, results);
            handleRestart();
            setScreen('lang');
          }}}
        />
      )}
      <Dialog
        visible={showSkipWarning}
        onClose={() => setShowSkipWarning(false)}
        title={lang === 'en' ? 'Skip review?' : 'تخطي المراجعة؟'}
        body={lang === 'en'
          ? 'This review helps you refresh key concepts before the quiz. Skipping means you might find the questions harder.'
          : 'هالمراجعة تساعدك تسترجع المفاهيم الأساسية قبل الاختبار. إذا تخطيتها ممكن تكون الأسئلة أصعب.'
        }
        primaryLabel={lang === 'en' ? 'Continue Review' : 'كمّل المراجعة'}
        secondaryLabel={lang === 'en' ? 'Skip Review' : 'تخطي المراجعة'}
        onPrimary={() => setShowSkipWarning(false)}
        onSecondary={() => { setShowSkipWarning(false); analytics.trackCatchupSkipped(); closeTutor(); setScreen('quiz'); }}
      />
      <Dialog
        visible={showEndTutorWarning}
        onClose={() => setShowEndTutorWarning(false)}
        title={lang === 'en' ? 'Skip tutor?' : 'تخطي المعلم؟'}
        body={lang === 'en'
          ? 'The tutor is helping you understand this question. Skipping means you\'ll move on without working through it.'
          : 'المعلم يساعدك تفهم هالسؤال. إذا تخطيته بتنتقل بدون ما تفهمه.'
        }
        primaryLabel={lang === 'en' ? 'Continue with Tutor' : 'كمّل مع المعلم'}
        secondaryLabel={lang === 'en' ? 'Skip Tutor' : 'تخطي المعلم'}
        onPrimary={() => setShowEndTutorWarning(false)}
        onSecondary={() => { setShowEndTutorWarning(false); closeTutor(); handleNext(); }}
      />

      <Dialog
        visible={showExitWarning}
        onClose={() => setShowExitWarning(false)}
        title={lang === 'en' ? 'Exit session?' : 'الخروج من الجلسة؟'}
        body={lang === 'en'
          ? 'Your progress won\'t be saved. Are you sure you want to exit?'
          : 'تقدمك ما بينحفظ. متأكد تبي تطلع؟'
        }
        primaryLabel={lang === 'en' ? 'Continue' : 'كمّل'}
        secondaryLabel={lang === 'en' ? 'Exit Session' : 'الخروج من الجلسة'}
        onPrimary={() => setShowExitWarning(false)}
        onSecondary={() => {
          setShowExitWarning(false);
          analytics.trackSessionExited('quiz', questionIdx);
          stopListening();
          if (conversationRef.current) {
            try { conversationRef.current.endSession(); } catch {}
            conversationRef.current = null;
          }
          setScreen('lang');
          setQuestionIdx(0);
          setSelectedOption(null);
          setSubmitted(false);
          setIsCorrect(false);
          setScore(0);
          setTutorState('idle');
          setConvo([]);
          setTypingMode(false);
          typingModeRef.current = false;
          setResults(['current', ...Array(QUESTIONS.length - 1).fill('pending')]);
        }}
      />

      {/* Explanation overlay — replaces quiz content */}
      {showExplanation && (
        <>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: theme.bg, zIndex: 50 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: sp[5], paddingVertical: sp[3], paddingTop: Math.max(sp[3], insets.top), borderBottomWidth: 1, borderBottomColor: theme.divider }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg, flex: 1 }}>
                {lang === 'en' ? 'Explanation' : 'الشرح'}
              </Text>
              <Pressable onPress={() => setShowExplanation(false)} hitSlop={8}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle }}>
                  {lang === 'en' ? 'Close' : 'إغلاق'}
                </Text>
              </Pressable>
            </View>

            {/* Scrollable content */}
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: sp[20] }}>
              <View style={{ padding: sp[5], gap: sp[4], maxWidth: 600, width: '100%', alignSelf: 'center' as any }}>
                {/* Your answer vs correct answer — at top for context */}
                <View style={{ gap: sp[2] }}>
                  <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {lang === 'en' ? 'Your answer' : 'إجابتك'}
                  </Text>
                  {selectedOption && (
                    <QuizOption
                      label={selectedOption}
                      text={question.options.find(o => o.label === selectedOption)?.text[lang]}
                      state="incorrect"
                    />
                  )}
                </View>
                <View style={{ gap: sp[2] }}>
                  <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {lang === 'en' ? 'Correct answer' : 'الإجابة الصحيحة'}
                  </Text>
                  <QuizOption
                    label={question.correctLabel}
                    text={question.options.find(o => o.label === question.correctLabel)?.text[lang]}
                    state="correct"
                  />
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: theme.divider }} />

                {/* Text explanation */}
                {question.explanation && (
                  <Text style={{
                    fontFamily: font.sans, fontSize: fs[15], color: theme.fg,
                    lineHeight: fs[15] * 1.6,
                  }}>
                    {question.explanation[lang]}
                  </Text>
                )}

                {/* Video explanation if available — embedded */}
                {question.explanationUrl && (
                  <View style={{ borderRadius: r[2], overflow: 'hidden', backgroundColor: theme.hoverOverlay }}>
                    <iframe
                      src={question.explanationUrl}
                      style={{ width: '100%', aspectRatio: '16/9', border: 'none' } as any}
                      allow="autoplay"
                      allowFullScreen
                    />
                  </View>
                )}

                {/* Explanation image */}
                {question.explanationImage && (
                  <Image
                    source={{ uri: question.explanationImage }}
                    style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: r[2], backgroundColor: theme.hoverOverlay }}
                    resizeMode="contain"
                  />
                )}
              </View>
            </ScrollView>
          </View>
          {/* BottomAction pinned at bottom — same z-index layer */}
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 51 }}>
            <BottomAction
              primary={{
                label: questionIdx + 1 >= QUESTIONS.length
                  ? (lang === 'en' ? 'See Results' : 'عرض النتائج')
                  : (lang === 'en' ? 'Try one similar' : 'جرب سؤال مشابه'),
                onPress: () => { setShowExplanation(false); handleNext(); },
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

// ─── Root wrapper ───────────────────────────────────────────────

export default function App() {
  const [fontsLoaded] = useFonts({
    CrimsonPro: CrimsonPro_400Regular,
    'CrimsonPro-SemiBold': CrimsonPro_600SemiBold,
    JetBrainsMono: JetBrainsMono_400Regular,
    'JetBrainsMono-SemiBold': JetBrainsMono_600SemiBold,
    Vazirmatn_300Light,
    Vazirmatn: Vazirmatn_400Regular,
    Vazirmatn_500Medium,
    'Vazirmatn-SemiBold': Vazirmatn_600SemiBold,
    Vazirmatn_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider initial="void">
          <TutorApp />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
