/**
 * Live speech-to-text using browser's Web Speech API.
 * Single instance — never runs multiple recognitions in parallel.
 */

let recognition: any = null;
let shouldBeListening = false;
let currentCallback: ((text: string, isFinal: boolean) => void) | null = null;
let currentLang: string = 'en-US';
let restartTimer: ReturnType<typeof setTimeout> | null = null;

export function startListening(
  lang: 'en' | 'ar',
  onTranscript: (text: string, isFinal: boolean) => void,
  onEnd?: () => void,
) {
  if (typeof window === 'undefined') return;

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported. Try Chrome.');
    onEnd?.();
    return;
  }

  // Kill everything first
  stopListening();

  shouldBeListening = true;
  currentCallback = onTranscript;
  currentLang = lang === 'ar' ? 'ar-SA' : 'en-US';

  createAndStart();
}

function createAndStart() {
  if (!shouldBeListening || !currentCallback) return;

  // Ensure no existing instance
  if (recognition) {
    try { recognition.onend = null; recognition.onerror = null; recognition.stop(); } catch {}
    recognition = null;
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const rec = new SpeechRecognition();
  rec.lang = currentLang;
  rec.interimResults = true;
  rec.continuous = true;
  recognition = rec;

  let resultStart = 0; // Track where new results begin for this session

  rec.onresult = (event: any) => {
    let interim = '';
    let final = '';
    // Only process results from this session (skip old accumulated ones)
    for (let i = resultStart; i < event.results.length; i++) {
      const t = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        final += t;
        resultStart = i + 1; // Skip finalized results on next callback
      } else {
        interim += t;
      }
    }
    if (final) {
      currentCallback?.(final.trim(), true);
    }
    if (interim) {
      currentCallback?.((final + interim).trim(), false);
    }
  };

  rec.onerror = () => {
    // Don't restart here — let onend handle it
  };

  rec.onend = () => {
    // Only restart if we should still be listening and this is still the active instance
    if (shouldBeListening && recognition === rec) {
      recognition = null;
      // Debounce restart to prevent cascade
      if (restartTimer) clearTimeout(restartTimer);
      restartTimer = setTimeout(() => {
        if (shouldBeListening) createAndStart();
      }, 200);
    }
  };

  try {
    rec.start();
  } catch {}
}

export function stopListening() {
  shouldBeListening = false;
  currentCallback = null;
  if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
  if (recognition) {
    const rec = recognition;
    recognition = null;
    rec.onend = null;
    rec.onerror = null;
    try { rec.stop(); } catch {}
  }
}
