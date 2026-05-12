import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
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

type TutorState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';
type Screen = 'lang' | 'catchup' | 'quiz' | 'tutor' | 'results';

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
  const conversationRef = useRef<any>(null);
  const scrollRef = useRef<ScrollView>(null);
  const revealTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isSpeakingRef = useRef(false);
  const liveTranscriptRef = useRef<string>(''); // current interim transcript

  const question = QUESTIONS[questionIdx];
  const { width: screenW, height: screenH } = useWindowDimensions();

  // Unlock audio on Safari — must be called from a user gesture
  const unlockAudio = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
      ctx.resume();
    } catch {}
  }, []);

  // Prefetch catchup config on mount so it's ready when user picks a language
  useEffect(() => {
    prefetchCatchupConfig({
      subjectName: 'Design',
      topicName: 'Alignment',
      conceptsCovered: 'Alignment as a design principle — how placing elements along a shared invisible edge creates visual connection, order, and relationship between otherwise separate elements on a page',
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

    // Remove any chunk preview
    setConvo(prev => {
      const last = prev[prev.length - 1];
      if (last?.from === 'tutor' && (last as any)._chunk) return prev.slice(0, -1);
      return prev;
    });

    const words = text.split(/\s+/);
    const totalChars = words.reduce((sum, w) => sum + w.length, 0);
    const totalDur = words.length * MS_PER_WORD;
    const msgId = ++msgIdRef.current;

    // Insert full text ghosted, first word revealed
    setConvo(prev => [...prev, { from: 'tutor', text, revealedLength: words[0].length, _id: msgId } as any]);

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

  // Start/stop live STT when agent mode changes
  const sttDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Agent mic is PERMANENTLY muted. We use sendUserMessage() to send text.
  // This completely prevents silence reprompts.
  const handleModeForSTT = useCallback((mode: TutorMode) => {
    if (mode === 'listening') {
      // Don't start STT if in typing mode
      if (typingModeRef.current) {
        console.log('[STT] skipped — typing mode active');
        return;
      }
      if (sttDelayRef.current) clearTimeout(sttDelayRef.current);
      sttDelayRef.current = setTimeout(() => {
        liveTranscriptRef.current = '';
        let placeholderAdded = false;
        let silenceTimer: ReturnType<typeof setTimeout> | null = null;

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

          // After 1.5s silence: confirm message, stop STT, send text to agent
          if (silenceTimer) clearTimeout(silenceTimer);
          silenceTimer = setTimeout(() => {
            const finalText = liveTranscriptRef.current;
            if (finalText) {
              // Confirm in UI
              setConvo(prev => {
                const next = [...prev];
                for (let i = next.length - 1; i >= 0; i--) {
                  if (next[i].from === 'student' && !next[i].confirmed) {
                    next[i] = { ...next[i], confirmed: true };
                    break;
                  }
                }
                return next;
              });
              // Send to agent as text — mic is muted so this is the only input
              stopListening();
              conversationRef.current?.sendUserMessage(finalText);
              liveTranscriptRef.current = '';
            }
          }, 1500);
        });
      }, 800);
    } else {
      // Agent started speaking — stop STT
      if (sttDelayRef.current) { clearTimeout(sttDelayRef.current); sttDelayRef.current = null; }
      stopListening();

      // Confirm or remove any pending student message
      const finalText = liveTranscriptRef.current;
      if (finalText) {
        setConvo(prev => {
          const next = [...prev];
          for (let i = next.length - 1; i >= 0; i--) {
            if (next[i].from === 'student' && !next[i].confirmed) {
              next[i] = { ...next[i], text: finalText, confirmed: true };
              break;
            }
          }
          return next;
        });
      } else {
        setConvo(prev => {
          const next = [...prev];
          for (let i = next.length - 1; i >= 0; i--) {
            if (next[i].from === 'student' && !next[i].confirmed) {
              next.splice(i, 1);
              break;
            }
          }
          return next;
        });
      }
      liveTranscriptRef.current = '';
    }
  }, [lang]);

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
    if (correct) {
      setScore(s => s + 1);
      setResults(r => r.map((s, i) => i === questionIdx ? 'correct' : s));
    } else {
      setResults(r => r.map((s, i) => i === questionIdx ? 'incorrect' : s));
      // Pre-configure agent now so it's ready when student taps "Talk to Tutor"
      prefetchConfigRef.current = configureAgentForTutor(question, selectedOption, lang);
    }
  }, [selectedOption, question, questionIdx, lang]);

  const handleNext = useCallback(() => {
    if (questionIdx + 1 >= QUESTIONS.length) {
      setScreen('results');
    } else {
      setResults(r => r.map((s, i) => i === questionIdx + 1 ? 'current' : s));
      setQuestionIdx(i => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setIsCorrect(false);
    }
  }, [questionIdx]);

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
  const [typingMode, setTypingMode] = useState(false);
  const [typingText, setTypingText] = useState('');
  const typingModeRef = useRef(false);

  const openCatchup = useCallback(async (overrideLang?: Lang) => {
    const sessionLang = overrideLang || lang;
    setScreen('catchup');
    setConvo([]);
    setCatchupReady(false);
    setTutorState('thinking');

    try {
      // Hardcoded for testing — replace with real data later
      const catchupConfig: CatchupConfig = {
        subjectName: 'Design',
        topicName: 'Alignment',
        conceptsCovered: 'Alignment as a design principle — how placing elements along a shared invisible edge creates visual connection, order, and relationship between otherwise separate elements on a page',
      };
      setCatchupTopic(catchupConfig.topicName);
      // Generate breakdown from AI
      generateBreakdown(catchupConfig.topicName, catchupConfig.conceptsCovered, sessionLang)
        .then(bd => setCatchupBreakdown(bd));

      const conversation = await startCatchupSession(
        catchupConfig,
        sessionLang,
        {
          onConnect: (id) => {
            console.log('Catchup connected:', id);
            setTutorState('speaking');
          },
          onDisconnect: () => {
            setTutorState('idle');
          },
          onModeChange: (mode: TutorMode) => {
            console.log('[catchup] mode:', mode);
            setTutorState(mode === 'speaking' ? 'speaking' : 'listening');
            isSpeakingRef.current = mode === 'speaking';
            handleModeForSTT(mode);
          },
          onAgentChunk: (text: string) => {
            // Show/update ghosted preview as LLM streams — before speech starts
            setConvo(prev => {
              const last = prev[prev.length - 1];
              if (last?.from === 'tutor' && (last as any)._chunk) {
                const next = [...prev];
                next[next.length - 1] = { from: 'tutor', text, revealedLength: 0, _chunk: true } as any;
                return next;
              }
              return [...prev, { from: 'tutor', text, revealedLength: 0, _chunk: true } as any];
            });
          },
          onMessage: (text: string, role: 'user' | 'agent') => {
            console.log('[catchup] message:', role, text?.substring(0, 40));
            if (!text) return;
            // Filter out silence artifacts and reprompts
            if (role === 'agent') {
              const lower = text.toLowerCase();
              // Skip reprompt messages
              const isTrigger =
                lower.includes("let's start the quiz") ||
                lower.includes("let's try a question") ||
                lower.includes('يلا نبدأ الاختبار') ||
                lower.includes("you're ready") ||
                lower.includes('جاهز') ||
                lower.includes('نجرب سؤال');
              startWordReveal(text, isTrigger ? () => {
                // Wait for the tutor to finish speaking before showing resources
                // Word reveal finishes before audio — give extra time for audio to complete
                const words = text.split(/\s+/).length;
                const audioBuffer = Math.max(3000, words * 100); // at least 3s
                setTimeout(() => {
                  setCatchupReady(true);
                  if (sttDelayRef.current) { clearTimeout(sttDelayRef.current); sttDelayRef.current = null; }
                  stopListening();
                  setConvo(prev => {
                    const last = prev[prev.length - 1];
                    if (last?.from === 'student' && !last.confirmed && !last.text) return prev.slice(0, -1);
                    return prev;
                  });
                  setTimeout(() => {
                    if (conversationRef.current) {
                      try { conversationRef.current.endSession(); } catch {}
                      conversationRef.current = null;
                    }
                  }, 1000);
                }, audioBuffer);
              } : undefined);
            } else {
              // Update the most recent student message with the agent's final transcript
              setConvo(prev => {
                const next = [...prev];
                for (let i = next.length - 1; i >= 0; i--) {
                  if (next[i].from === 'student') {
                    next[i] = { ...next[i], text, confirmed: true };
                    return next;
                  }
                }
                // No student message at all — add one
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
    } catch (err) {
      console.error('Failed to start catchup:', err);
      setTutorState('error');
    }
  }, [lang]);

  // ─── Tutor session via ElevenLabs Agent ─────────────

  const openTutor = useCallback(async () => {
    setScreen('tutor');
    setConvo([]);
    setCanRetry(false);
    setTutorState('thinking');

    try {
      const prefetch = prefetchConfigRef.current;
      prefetchConfigRef.current = null;

      const conversation = await startTutorSession(
        question,
        selectedOption!,
        lang,
        {
          onConnect: (id) => {
            console.log('Tutor connected:', id);
            setTutorState('speaking');
          },
          onDisconnect: () => {
            console.log('Tutor disconnected');
            setTutorState('idle');
          },
          onModeChange: (mode: TutorMode) => {
            console.log('[tutor] mode:', mode);
            setTutorState(mode === 'speaking' ? 'speaking' : 'listening');
            isSpeakingRef.current = mode === 'speaking';
            handleModeForSTT(mode);
          },
          onAgentChunk: (text: string) => {
            setConvo(prev => {
              const last = prev[prev.length - 1];
              if (last?.from === 'tutor' && (last as any)._chunk) {
                const next = [...prev];
                next[next.length - 1] = { from: 'tutor', text, revealedLength: 0, _chunk: true } as any;
                return next;
              }
              return [...prev, { from: 'tutor', text, revealedLength: 0, _chunk: true } as any];
            });
          },
          onMessage: (text: string, role: 'user' | 'agent') => {
            console.log('[tutor] message:', role, text?.substring(0, 40));
            if (!text) return;
            if (role === 'agent') {
              const lower = text.toLowerCase();
              const isTrigger =
                lower.includes("you've got it") ||
                lower.includes('أحسنت، فهمتها') ||
                lower.includes('now you know') ||
                lower.includes('الحين عرفت') ||
                lower.includes('يلا نكمل');
              startWordReveal(text, isTrigger ? () => {
                setCanRetry(true);
                if (sttDelayRef.current) { clearTimeout(sttDelayRef.current); sttDelayRef.current = null; }
                stopListening();
                setConvo(prev => {
                  const last = prev[prev.length - 1];
                  if (last?.from === 'student' && !last.confirmed && !last.text) return prev.slice(0, -1);
                  return prev;
                });
                setTimeout(() => {
                  if (conversationRef.current) {
                    try { conversationRef.current.endSession(); } catch {}
                    conversationRef.current = null;
                  }
                }, 500);
              } : undefined);
            } else {
              setConvo(prev => {
                const hasIt = prev.some(m => m.from === 'student' && m.text === text);
                if (hasIt) return prev;
                const next = [...prev];
                let found = false;
                for (let i = next.length - 1; i >= 0; i--) {
                  if (next[i].from === 'student' && !next[i].confirmed) {
                    next[i] = { ...next[i], text, confirmed: true };
                    found = true;
                    break;
                  }
                }
                if (!found) return [...prev, { from: 'student', text, confirmed: true }];
                return next;
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
    } catch (err) {
      console.error('Failed to start tutor session:', err);
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
      {screen !== 'lang' && (
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
                : (lang === 'en' ? 'Quiz' : 'اختبار')
            }
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
            {screen === 'catchup' && (
              <Pressable onPress={() => setShowSkipWarning(true)}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fgSubtle }}>
                  {lang === 'en' ? 'Skip' : 'تخطي'}
                </Text>
              </Pressable>
            )}
            {screen === 'tutor' && (
              <Pressable onPress={() => setShowEndTutorWarning(true)}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fgSubtle }}>
                  {t.endSession[lang]}
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
              <Button variant="secondary" onPress={() => { unlockAudio(); setLang('en'); openCatchup('en'); }}>
                English
              </Button>
              <Button variant="secondary" onPress={() => { unlockAudio(); setLang('ar'); openCatchup('ar'); }}>
                العربية
              </Button>
            </View>
          </View>
        </View>
      )}

      {/* ── Catchup screen ── */}
      {screen === 'catchup' && (
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], gap: sp[5], paddingBottom: sp[8], maxWidth: 600, width: '100%', alignSelf: 'center' }}>
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
                title={lang === 'en' ? 'Alignment in Practice' : 'المحاذاة في التطبيق'}
                steps={[
                  { title: lang === 'en' ? 'Identify the edges' : 'حدد الحواف', content: lang === 'en' ? 'Look at every element on the page. Which edges could share a common line — left, right, center, or top?' : 'انظر لكل عنصر في الصفحة. أي الحواف يمكن أن تشترك في خط واحد — يسار، يمين، وسط، أو أعلى؟' },
                  { title: lang === 'en' ? 'Draw invisible lines' : 'ارسم خطوط وهمية', content: lang === 'en' ? 'Imagine vertical and horizontal lines connecting elements. Strong alignment means elements snap to these lines consistently.' : 'تخيل خطوط عمودية وأفقية تربط العناصر. المحاذاة القوية تعني أن العناصر تلتزم بهذه الخطوط باستمرار.' },
                  { title: lang === 'en' ? 'Check the result' : 'تحقق من النتيجة', content: lang === 'en' ? 'Well-aligned layouts feel organized and intentional. Misaligned elements feel random, even if the content is good.' : 'التخطيطات المحاذاة تبدو منظمة ومقصودة. العناصر غير المحاذاة تبدو عشوائية حتى لو المحتوى جيد.' },
                ]}
              />
              <VideoCard
                title={lang === 'en' ? 'Understanding Alignment' : 'فهم المحاذاة'}
                attribution={lang === 'en' ? 'Noon Academy' : 'أكاديمية نون'}
                duration="3:20"
                uri=""
                onPress={() => {}}
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
          <Text style={{
            fontFamily: font.sans, fontSize: fs[18], fontWeight: fw[600],
            color: theme.fg, lineHeight: fs[18] * 1.5,
          }}>
            {question.text[lang]}
          </Text>

          <View style={{ gap: sp[3], marginTop: sp[3] }}>
            {question.options.map(opt => (
              <QuizOption
                key={opt.label}
                label={opt.label}
                text={opt.text[lang]}
                state={optionState(opt.label)}
                onPress={() => !submitted && setSelectedOption(opt.label)}
              />
            ))}
          </View>

        </ScrollView>
      )}

      {/* ── Tutor screen ── */}
      {screen === 'tutor' && (
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], gap: sp[5], paddingBottom: sp[8], maxWidth: 600, width: '100%', alignSelf: 'center' }}>
          {/* Question context card */}
          <View style={{
            padding: sp[4], borderRadius: r[3],
            backgroundColor: theme.inputBg,
            borderWidth: 1, borderColor: theme.border,
            gap: sp[3],
          }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, lineHeight: fs[14] * 1.5 }}>
              {question.text[lang]}
            </Text>
            {selectedOption && (
              <QuizOption
                label={selectedOption}
                text={question.options.find(o => o.label === selectedOption)?.text[lang]}
                state="incorrect"
              />
            )}
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
          secondary={{ label: lang === 'en' ? 'View Explanation' : 'عرض الشرح', onPress: () => setShowExplanation(true) }}
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
          {typingMode ? (
            <>
              {/* Keyboard mode — tutor button + text input + send */}
              <View style={{ flexDirection: 'row', gap: sp[2], width: '100%', alignItems: 'center' }}>
                <Pressable
                  onPress={() => {
                    console.log('[MODE] switching to voice');
                    setTypingMode(false);
                    typingModeRef.current = false;
                    setTypingText('');
                    setTutorState('listening');
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
                onPress={() => { console.log('[MODE] switching to text'); setTypingMode(true); typingModeRef.current = true; stopListening(); conversationRef.current?.setMicMuted(true); }}
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
          primary={{ label: lang === 'en' ? 'Start Quiz' : 'ابدأ الاختبار', onPress: () => { setScreen('quiz'); } }}
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
          {typingMode ? (
            <>
              {/* Keyboard mode — tutor button + text input + send */}
              <View style={{ flexDirection: 'row', gap: sp[2], width: '100%', alignItems: 'center' }}>
                <Pressable
                  onPress={() => {
                    console.log('[MODE] switching to voice');
                    setTypingMode(false);
                    typingModeRef.current = false;
                    setTypingText('');
                    setTutorState('listening');
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
                onPress={() => { console.log('[MODE] switching to text'); setTypingMode(true); typingModeRef.current = true; stopListening(); conversationRef.current?.setMicMuted(true); }}
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
          primary={{ label: t.restart[lang], onPress: handleRestart }}
        />
      )}
      <Dialog
        visible={showSkipWarning}
        onClose={() => setShowSkipWarning(false)}
        title={lang === 'en' ? 'Skip the review?' : 'تخطي المراجعة؟'}
        body={lang === 'en'
          ? 'This catchup helps you refresh key concepts before the quiz. Skipping means you might find the questions harder. Are you sure?'
          : 'هالمراجعة تساعدك تسترجع المفاهيم الأساسية قبل الاختبار. إذا تخطيتها ممكن تكون الأسئلة أصعب. متأكد؟'
        }
        primaryLabel={lang === 'en' ? 'Continue Review' : 'كمّل المراجعة'}
        secondaryLabel={lang === 'en' ? 'Skip Anyway' : 'تخطي'}
        onPrimary={() => setShowSkipWarning(false)}
        onSecondary={() => { setShowSkipWarning(false); closeTutor(); setScreen('quiz'); }}
      />
      <Dialog
        visible={showEndTutorWarning}
        onClose={() => setShowEndTutorWarning(false)}
        title={lang === 'en' ? 'End tutor session?' : 'إنهاء جلسة المعلم؟'}
        body={lang === 'en'
          ? 'The tutor is helping you understand this question. Ending now means you\'ll move on without fully working through it.'
          : 'المعلم يساعدك تفهم هالسؤال. إذا أنهيت الجلسة الحين بتنتقل بدون ما تفهمه بالكامل.'
        }
        primaryLabel={lang === 'en' ? 'Continue Session' : 'كمّل الجلسة'}
        secondaryLabel={lang === 'en' ? 'End Anyway' : 'أنهي'}
        onPrimary={() => setShowEndTutorWarning(false)}
        onSecondary={() => { setShowEndTutorWarning(false); closeTutor(); handleNext(); }}
      />

      {/* Explanation sheet */}
      <FullSheet
        visible={showExplanation}
        onClose={() => setShowExplanation(false)}
        title={lang === 'en' ? 'Explanation' : 'الشرح'}
      >
        <View style={{ padding: sp[5], gap: sp[5], maxWidth: 600, width: '100%', alignSelf: 'center' as any }}>
          {/* Video explanation if available */}
          {question.explanationUrl && (
            <VideoCard
              title={lang === 'en' ? 'Video Explanation' : 'شرح بالفيديو'}
              uri={question.explanationUrl}
            />
          )}

          {/* Text explanation */}
          {question.explanation && (
            <Text style={{
              fontFamily: font.sans, fontSize: fs[15], color: theme.fg,
              lineHeight: fs[15] * 1.6,
            }}>
              {question.explanation[lang]}
            </Text>
          )}

          {/* Correct answer */}
          <View style={{ gap: sp[2] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.accent, letterSpacing: 1, textTransform: 'uppercase' }}>
              {lang === 'en' ? 'Correct answer' : 'الإجابة الصحيحة'}
            </Text>
            <QuizOption
              label={question.correctLabel}
              text={question.options.find(o => o.label === question.correctLabel)?.text[lang]}
              state="correct"
            />
          </View>

          <Button fullWidth onPress={() => { setShowExplanation(false); handleNext(); }}>
            {questionIdx + 1 >= QUESTIONS.length
              ? (lang === 'en' ? 'See Results' : 'عرض النتائج')
              : (lang === 'en' ? 'Try one similar' : 'جرب سؤال مشابه')
            }
          </Button>
        </View>
      </FullSheet>
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
