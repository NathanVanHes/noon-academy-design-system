export interface Question {
  id: number;
  text: { en: string; ar: string };
  image?: string; // question image URL
  options: { label: string; text: { en: string; ar: string }; image?: string }[];
  correctLabel: string; // "A", "B", "C", or "D"
  explanation?: { en: string; ar: string }; // text explanation
  explanationUrl?: string; // video explanation URL
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: {
      en: 'Which principle states that every element on a page should have a visual connection with something else on the page?',
      ar: 'ما المبدأ الذي ينص على أن كل عنصر في الصفحة يجب أن يكون له ارتباط بصري بعنصر آخر في الصفحة؟',
    },
    options: [
      { label: 'A', text: { en: 'Contrast', ar: 'التباين' } },
      { label: 'B', text: { en: 'Alignment', ar: 'المحاذاة' } },
      { label: 'C', text: { en: 'Repetition', ar: 'التكرار' } },
      { label: 'D', text: { en: 'Proximity', ar: 'التقارب' } },
    ],
    correctLabel: 'B',
    explanation: {
      en: 'Alignment is the principle that every element should have a visual connection with something else on the page. When elements are aligned along a shared invisible edge, they feel connected and organized — even if they are far apart. This creates order and makes the layout feel intentional rather than random.',
      ar: 'المحاذاة هي المبدأ الذي ينص على أن كل عنصر يجب أن يكون له ارتباط بصري بعنصر آخر في الصفحة. عندما تكون العناصر محاذاة على حافة مشتركة غير مرئية، تبدو مترابطة ومنظمة — حتى لو كانت بعيدة عن بعضها. هذا يخلق نظاماً ويجعل التخطيط يبدو مقصوداً وليس عشوائياً.',
    },
  },
  {
    id: 2,
    text: {
      en: 'What is the recommended minimum touch target size for mobile interfaces according to Apple HIG?',
      ar: 'ما هو الحد الأدنى الموصى به لحجم هدف اللمس في واجهات الجوال وفقاً لإرشادات Apple؟',
    },
    options: [
      { label: 'A', text: { en: '36 × 36 points', ar: '٣٦ × ٣٦ نقطة' } },
      { label: 'B', text: { en: '44 × 44 points', ar: '٤٤ × ٤٤ نقطة' } },
      { label: 'C', text: { en: '48 × 48 points', ar: '٤٨ × ٤٨ نقطة' } },
      { label: 'D', text: { en: '56 × 56 points', ar: '٥٦ × ٥٦ نقطة' } },
    ],
    correctLabel: 'B',
  },
  {
    id: 3,
    text: {
      en: 'In color theory, what do you call two colors that sit directly opposite each other on the color wheel?',
      ar: 'في نظرية الألوان، ماذا يُسمى اللونان اللذان يقعان مقابل بعضهما مباشرة على عجلة الألوان؟',
    },
    options: [
      { label: 'A', text: { en: 'Analogous', ar: 'متماثلة' } },
      { label: 'B', text: { en: 'Triadic', ar: 'ثلاثية' } },
      { label: 'C', text: { en: 'Complementary', ar: 'متكاملة' } },
      { label: 'D', text: { en: 'Monochromatic', ar: 'أحادية اللون' } },
    ],
    correctLabel: 'C',
  },
  {
    id: 4,
    text: {
      en: 'Which typographic measure refers to the vertical space between lines of text?',
      ar: 'ما المقياس الطباعي الذي يشير إلى المسافة العمودية بين سطور النص؟',
    },
    options: [
      { label: 'A', text: { en: 'Kerning', ar: 'تقنين الأحرف' } },
      { label: 'B', text: { en: 'Tracking', ar: 'التتبع' } },
      { label: 'C', text: { en: 'Leading', ar: 'المسافة بين السطور' } },
      { label: 'D', text: { en: 'Baseline', ar: 'خط الأساس' } },
    ],
    correctLabel: 'C',
  },
  {
    id: 5,
    text: {
      en: 'What does the "F" in F-pattern reading behavior stand for?',
      ar: 'ماذا يعني حرف "F" في نمط القراءة على شكل حرف F؟',
    },
    options: [
      { label: 'A', text: { en: 'The shape of the eye movement path', ar: 'شكل مسار حركة العين' } },
      { label: 'B', text: { en: 'Focus-first layout', ar: 'تخطيط التركيز أولاً' } },
      { label: 'C', text: { en: 'Functional design', ar: 'التصميم الوظيفي' } },
      { label: 'D', text: { en: 'Fixed-width grid', ar: 'الشبكة ثابتة العرض' } },
    ],
    correctLabel: 'A',
  },
  {
    id: 6,
    text: {
      en: 'Which design system spacing scale uses a base unit multiplied by consistent increments (e.g., 4, 8, 12, 16)?',
      ar: 'أي مقياس تباعد في نظام التصميم يستخدم وحدة أساسية مضروبة بزيادات ثابتة (مثل ٤، ٨، ١٢، ١٦)؟',
    },
    options: [
      { label: 'A', text: { en: 'Golden ratio scale', ar: 'مقياس النسبة الذهبية' } },
      { label: 'B', text: { en: '4-point grid', ar: 'شبكة ٤ نقاط' } },
      { label: 'C', text: { en: 'Fibonacci scale', ar: 'مقياس فيبوناتشي' } },
      { label: 'D', text: { en: 'Modular type scale', ar: 'مقياس النوع المعياري' } },
    ],
    correctLabel: 'B',
  },
  {
    id: 7,
    text: {
      en: 'What is the WCAG AA minimum contrast ratio for normal-sized body text?',
      ar: 'ما هو الحد الأدنى لنسبة التباين وفقاً لمعيار WCAG AA للنص العادي؟',
    },
    options: [
      { label: 'A', text: { en: '3:1', ar: '٣:١' } },
      { label: 'B', text: { en: '4.5:1', ar: '٤.٥:١' } },
      { label: 'C', text: { en: '7:1', ar: '٧:١' } },
      { label: 'D', text: { en: '2:1', ar: '٢:١' } },
    ],
    correctLabel: 'B',
  },
  {
    id: 8,
    text: {
      en: 'In Gestalt principles, which law states that the mind tends to perceive a set of individual elements as a single, recognizable shape?',
      ar: 'في مبادئ الجشطالت، أي قانون ينص على أن العقل يميل لإدراك مجموعة من العناصر الفردية كشكل واحد متعرّف عليه؟',
    },
    options: [
      { label: 'A', text: { en: 'Law of Proximity', ar: 'قانون التقارب' } },
      { label: 'B', text: { en: 'Law of Similarity', ar: 'قانون التشابه' } },
      { label: 'C', text: { en: 'Law of Closure', ar: 'قانون الإغلاق' } },
      { label: 'D', text: { en: 'Law of Continuity', ar: 'قانون الاستمرارية' } },
    ],
    correctLabel: 'C',
  },
  {
    id: 9,
    text: {
      en: 'Which layout technique uses named areas in CSS to create two-dimensional page layouts?',
      ar: 'ما تقنية التخطيط التي تستخدم مناطق مسماة في CSS لإنشاء تخطيطات صفحة ثنائية الأبعاد؟',
    },
    options: [
      { label: 'A', text: { en: 'Flexbox', ar: 'Flexbox' } },
      { label: 'B', text: { en: 'Float layout', ar: 'تخطيط Float' } },
      { label: 'C', text: { en: 'CSS Grid', ar: 'CSS Grid' } },
      { label: 'D', text: { en: 'Absolute positioning', ar: 'التموضع المطلق' } },
    ],
    correctLabel: 'C',
  },
  {
    id: 10,
    text: {
      en: 'What is a design token?',
      ar: 'ما هو رمز التصميم (Design Token)؟',
    },
    options: [
      { label: 'A', text: { en: 'A reusable UI component like a button', ar: 'مكون واجهة قابل لإعادة الاستخدام مثل الزر' } },
      { label: 'B', text: { en: 'A named value that stores a design decision (color, spacing, etc.)', ar: 'قيمة مسماة تخزن قرار تصميمي (لون، تباعد، إلخ)' } },
      { label: 'C', text: { en: 'A placeholder image in mockups', ar: 'صورة مؤقتة في النماذج الأولية' } },
      { label: 'D', text: { en: 'An authentication key for design tools', ar: 'مفتاح مصادقة لأدوات التصميم' } },
    ],
    correctLabel: 'B',
  },
];
