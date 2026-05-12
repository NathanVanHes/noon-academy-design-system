export interface Question {
  id: number;
  text: { en: string; ar: string };
  image?: string;
  options: { label: string; text: { en: string; ar: string }; image?: string }[];
  correctLabel: string;
  explanation?: { en: string; ar: string };
  explanationUrl?: string;
  explanationImage?: string;
}

// 10 questions about Number Sets, scaffolded from very easy to hard
export const QUESTIONS: Question[] = [
  // ─── Q1: Very Easy ───
  {
    id: 1,
    text: {
      en: 'Which of the following is a natural number?',
      ar: 'أي من التالي عدد طبيعي؟',
    },
    options: [
      { label: 'A', text: { en: '5', ar: '٥' } },
      { label: 'B', text: { en: '-3', ar: '-٣' } },
      { label: 'C', text: { en: '0', ar: '٠' } },
      { label: 'D', text: { en: '0.5', ar: '٠٫٥' } },
    ],
    correctLabel: 'A',
    explanation: {
      en: 'Natural numbers are the counting numbers starting from 1: {1, 2, 3, 4, ...}. The number 5 is a counting number, so it is natural. Zero, negatives, and decimals are not natural numbers.',
      ar: 'الأعداد الطبيعية هي أعداد العد بدءاً من ١: {١، ٢، ٣، ٤، ...}. الرقم ٥ هو عدد عد، لذلك هو طبيعي. الصفر والأعداد السالبة والكسور ليست أعداداً طبيعية.',
    },
  },
  // ─── Q2: Very Easy ───
  {
    id: 2,
    text: {
      en: 'What is the smallest natural number?',
      ar: 'ما هو أصغر عدد طبيعي؟',
    },
    options: [
      { label: 'A', text: { en: '0', ar: '٠' } },
      { label: 'B', text: { en: '1', ar: '١' } },
      { label: 'C', text: { en: '-1', ar: '-١' } },
      { label: 'D', text: { en: '0.1', ar: '٠٫١' } },
    ],
    correctLabel: 'B',
    explanation: {
      en: 'The natural numbers start at 1, not 0. So the smallest natural number is 1. Zero belongs to the whole numbers but not the natural numbers.',
      ar: 'الأعداد الطبيعية تبدأ من ١ وليس ٠. لذلك أصغر عدد طبيعي هو ١. الصفر ينتمي للأعداد الكلية لكن ليس للأعداد الطبيعية.',
    },
  },
  // ─── Q3: Easy ───
  {
    id: 3,
    text: {
      en: 'Which set of numbers includes zero but not negative numbers?',
      ar: 'أي مجموعة أعداد تشمل الصفر لكن لا تشمل الأعداد السالبة؟',
    },
    options: [
      { label: 'A', text: { en: 'Natural numbers', ar: 'الأعداد الطبيعية' } },
      { label: 'B', text: { en: 'Whole numbers', ar: 'الأعداد الكلية' } },
      { label: 'C', text: { en: 'Integers', ar: 'الأعداد الصحيحة' } },
      { label: 'D', text: { en: 'Rational numbers', ar: 'الأعداد النسبية' } },
    ],
    correctLabel: 'B',
    explanation: {
      en: 'Whole numbers are {0, 1, 2, 3, ...}. They include zero but no negatives. Natural numbers start at 1 (no zero). Integers include negatives too.',
      ar: 'الأعداد الكلية هي {٠، ١، ٢، ٣، ...}. تشمل الصفر لكن بدون سالب. الأعداد الطبيعية تبدأ من ١ (بدون صفر). الأعداد الصحيحة تشمل السالب أيضاً.',
    },
  },
  // ─── Q4: Easy-Medium ───
  {
    id: 4,
    text: {
      en: 'Which of the following is an integer but NOT a whole number?',
      ar: 'أي من التالي عدد صحيح لكن ليس عدداً كلياً؟',
    },
    options: [
      { label: 'A', text: { en: '7', ar: '٧' } },
      { label: 'B', text: { en: '0', ar: '٠' } },
      { label: 'C', text: { en: '-4', ar: '-٤' } },
      { label: 'D', text: { en: '3.5', ar: '٣٫٥' } },
    ],
    correctLabel: 'C',
    explanation: {
      en: 'Integers are {..., -2, -1, 0, 1, 2, ...}. Whole numbers are {0, 1, 2, ...}. So -4 is an integer but not a whole number because whole numbers don\'t include negatives. 3.5 is not an integer at all.',
      ar: 'الأعداد الصحيحة هي {...، -٢، -١، ٠، ١، ٢، ...}. الأعداد الكلية هي {٠، ١، ٢، ...}. لذلك -٤ عدد صحيح لكن ليس كلياً لأن الأعداد الكلية لا تشمل السالب. و ٣٫٥ ليس عدداً صحيحاً أصلاً.',
    },
  },
  // ─── Q5: Medium ───
  {
    id: 5,
    text: {
      en: 'The number 3/4 belongs to which number set?',
      ar: 'العدد ٣/٤ ينتمي لأي مجموعة أعداد؟',
    },
    options: [
      { label: 'A', text: { en: 'Natural numbers', ar: 'الأعداد الطبيعية' } },
      { label: 'B', text: { en: 'Integers', ar: 'الأعداد الصحيحة' } },
      { label: 'C', text: { en: 'Rational numbers', ar: 'الأعداد النسبية' } },
      { label: 'D', text: { en: 'Irrational numbers', ar: 'الأعداد غير النسبية' } },
    ],
    correctLabel: 'C',
    explanation: {
      en: 'A rational number is any number that can be written as a fraction a/b where b is not zero. Since 3/4 is already a fraction of two integers, it is rational. It is not an integer because it is not a whole value.',
      ar: 'العدد النسبي هو أي عدد يمكن كتابته على شكل كسر أ/ب حيث ب لا تساوي صفر. بما أن ٣/٤ هو كسر من عددين صحيحين، فهو نسبي. وهو ليس عدداً صحيحاً لأنه ليس قيمة كاملة.',
    },
  },
  // ─── Q6: Medium ───
  {
    id: 6,
    text: {
      en: 'Which statement is TRUE about the number 0?',
      ar: 'أي عبارة صحيحة عن العدد ٠؟',
    },
    options: [
      { label: 'A', text: { en: 'It is a natural number', ar: 'هو عدد طبيعي' } },
      { label: 'B', text: { en: 'It is a whole number but not natural', ar: 'هو عدد كلي لكن ليس طبيعياً' } },
      { label: 'C', text: { en: 'It is an integer but not whole', ar: 'هو عدد صحيح لكن ليس كلياً' } },
      { label: 'D', text: { en: 'It is irrational', ar: 'هو عدد غير نسبي' } },
    ],
    correctLabel: 'B',
    explanation: {
      en: 'Zero is a whole number {0, 1, 2, ...} and an integer {..., -1, 0, 1, ...}, but it is NOT a natural number because natural numbers start at 1. It is also rational since 0 = 0/1.',
      ar: 'الصفر عدد كلي {٠، ١، ٢، ...} وعدد صحيح {...، -١، ٠، ١، ...}، لكنه ليس عدداً طبيعياً لأن الأعداد الطبيعية تبدأ من ١. وهو أيضاً نسبي لأن ٠ = ٠/١.',
    },
  },
  // ─── Q7: Medium-Hard ───
  {
    id: 7,
    text: {
      en: 'Which of the following numbers is irrational?',
      ar: 'أي من الأعداد التالية غير نسبي؟',
    },
    options: [
      { label: 'A', text: { en: '0.75', ar: '٠٫٧٥' } },
      { label: 'B', text: { en: '√9', ar: '√٩' } },
      { label: 'C', text: { en: '√2', ar: '√٢' } },
      { label: 'D', text: { en: '22/7', ar: '٢٢/٧' } },
    ],
    correctLabel: 'C',
    explanation: {
      en: '√2 = 1.41421356... — it goes on forever without repeating, so it cannot be written as a fraction. That makes it irrational. √9 = 3 (a whole number), 0.75 = 3/4, and 22/7 is already a fraction — all rational.',
      ar: '√٢ = ١٫٤١٤٢١٣٥٦... — يستمر للأبد بدون تكرار، لذلك لا يمكن كتابته ككسر. هذا يجعله غير نسبي. √٩ = ٣ (عدد كلي)، ٠٫٧٥ = ٣/٤، و ٢٢/٧ هو كسر بالفعل — كلها نسبية.',
    },
  },
  // ─── Q8: Hard ───
  {
    id: 8,
    text: {
      en: 'Every natural number is also a:',
      ar: 'كل عدد طبيعي هو أيضاً:',
    },
    options: [
      { label: 'A', text: { en: 'Whole number, integer, and rational number', ar: 'عدد كلي وصحيح ونسبي' } },
      { label: 'B', text: { en: 'Whole number and integer, but not rational', ar: 'عدد كلي وصحيح، لكن ليس نسبياً' } },
      { label: 'C', text: { en: 'Integer and rational, but not whole', ar: 'عدد صحيح ونسبي، لكن ليس كلياً' } },
      { label: 'D', text: { en: 'Only a whole number', ar: 'عدد كلي فقط' } },
    ],
    correctLabel: 'A',
    explanation: {
      en: 'Number sets nest inside each other: Natural ⊂ Whole ⊂ Integer ⊂ Rational. So every natural number is automatically a whole number, an integer, and a rational number (e.g. 5 = 5/1).',
      ar: 'مجموعات الأعداد متداخلة: طبيعية ⊂ كلية ⊂ صحيحة ⊂ نسبية. لذلك كل عدد طبيعي هو تلقائياً عدد كلي وصحيح ونسبي (مثلاً ٥ = ٥/١).',
    },
  },
  // ─── Q9: Hard ───
  {
    id: 9,
    text: {
      en: 'The decimal 0.333... (repeating) is:',
      ar: 'العدد العشري ٠٫٣٣٣... (متكرر) هو:',
    },
    options: [
      { label: 'A', text: { en: 'Irrational, because it never ends', ar: 'غير نسبي، لأنه لا ينتهي' } },
      { label: 'B', text: { en: 'Rational, because it equals 1/3', ar: 'نسبي، لأنه يساوي ١/٣' } },
      { label: 'C', text: { en: 'An integer', ar: 'عدد صحيح' } },
      { label: 'D', text: { en: 'A natural number', ar: 'عدد طبيعي' } },
    ],
    correctLabel: 'B',
    explanation: {
      en: 'A number is rational if it can be written as a fraction. 0.333... = 1/3, which is a fraction of two integers. Repeating decimals are always rational. Only non-repeating, non-terminating decimals (like π) are irrational.',
      ar: 'العدد يكون نسبياً إذا أمكن كتابته ككسر. ٠٫٣٣٣... = ١/٣، وهو كسر من عددين صحيحين. الكسور العشرية المتكررة دائماً نسبية. فقط الكسور العشرية غير المتكررة وغير المنتهية (مثل π) هي غير نسبية.',
    },
  },
  // ─── Q10: Very Hard ───
  {
    id: 10,
    text: {
      en: 'Which of the following is TRUE about the set of real numbers?',
      ar: 'أي من التالي صحيح عن مجموعة الأعداد الحقيقية؟',
    },
    options: [
      { label: 'A', text: { en: 'Real numbers = Rational numbers only', ar: 'الأعداد الحقيقية = الأعداد النسبية فقط' } },
      { label: 'B', text: { en: 'Real numbers = Rational + Irrational numbers', ar: 'الأعداد الحقيقية = النسبية + غير النسبية' } },
      { label: 'C', text: { en: 'All real numbers are integers', ar: 'كل الأعداد الحقيقية أعداد صحيحة' } },
      { label: 'D', text: { en: 'Irrational numbers are not real numbers', ar: 'الأعداد غير النسبية ليست أعداداً حقيقية' } },
    ],
    correctLabel: 'B',
    explanation: {
      en: 'The real numbers include every number on the number line. They are made up of two groups that don\'t overlap: rational numbers (fractions, integers, whole numbers) and irrational numbers (√2, π). Together they form the complete set of real numbers.',
      ar: 'الأعداد الحقيقية تشمل كل عدد على خط الأعداد. تتكون من مجموعتين لا تتقاطعان: الأعداد النسبية (الكسور والصحيحة والكلية) والأعداد غير النسبية (√٢، π). معاً تشكل مجموعة الأعداد الحقيقية الكاملة.',
    },
  },
];
