export type Lang = 'en' | 'ar';

export const t = {
  questionOf: {
    en: (n: number, total: number) => `Question ${n} of ${total}`,
    ar: (n: number, total: number) => `السؤال ${n} من ${total}`,
  },
  submit: { en: 'Submit', ar: 'إرسال' },
  next: { en: 'Next Question', ar: 'السؤال التالي' },
  correct: { en: 'Correct!', ar: 'صحيح!' },
  incorrect: { en: "Not quite. Let's work through it.", ar: 'ليس تماماً. دعنا نتناقش.' },
  talkToTutor: { en: 'Review with Tutor', ar: 'راجع مع المعلم' },
  tryAgain: { en: 'Try Again', ar: 'حاول مرة أخرى' },

  recording: { en: 'Recording...', ar: 'جاري التسجيل...' },
  endSession: { en: 'End Tutor Session', ar: 'إنهاء جلسة المعلم' },
  quizComplete: { en: 'Quiz Complete!', ar: 'انتهى الاختبار!' },
  score: {
    en: (correct: number, total: number) => `You scored ${correct} out of ${total}`,
    ar: (correct: number, total: number) => `حصلت على ${correct} من ${total}`,
  },
  restart: { en: 'Restart', ar: 'إعادة البدء' },
  language: { en: 'العربية', ar: 'English' },
  listening: { en: 'Listening...', ar: 'أستمع...' },
  thinking: { en: 'Thinking...', ar: 'أفكر...' },
  speaking: { en: 'Speaking...', ar: 'أتحدث...' },
} as const;
