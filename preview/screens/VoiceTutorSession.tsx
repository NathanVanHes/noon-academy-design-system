/**
 * Voice Tutor Session — full animated conversation demo.
 * Built from pages/voice-tutor.html using design system components.
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useTheme, VoiceTutor, ChatMessage, TypingIndicator, BreakdownCard, ActivityCard,
  ResourceList, VideoCard, WorkedExampleCard, SlidesCard, FullSheet, Button,
  sp, fs, fw, font, r, color,
} from '../../rn';

type TutorState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

interface ConvoItem {
  type: 'tutor' | 'student' | 'breakdown' | 'activity' | 'video' | 'resources' | 'typing';
  text?: string;
  confirmed?: boolean;
  revealedLength?: number;
  data?: any;
}

// Helper: tutor speaks — thinking dots, then words stream in as tutor speaks
function tutorSpeaks(text: string, thinkMs = 1200): typeof SCRIPT[number][] {
  return [
    { action: 'state', state: 'thinking' as TutorState },
    { action: 'typing', delay: thinkMs },
    { action: 'state', state: 'speaking' as TutorState },
    { action: 'tutorStream', item: { type: 'tutor', text } },
  ];
}

// Helper: student speaks — listening state, words stream in unconfirmed, then confirm
function studentSpeaks(text: string): typeof SCRIPT[number][] {
  return [
    { action: 'state', state: 'listening' as TutorState },
    { action: 'wait', delay: 500 },
    { action: 'studentStream', item: { type: 'student', text, confirmed: false } },
    { action: 'wait', delay: 400 },
    { action: 'confirmStudent' },
    { action: 'wait', delay: 600 },
  ];
}

const SCRIPT: { action: string; state?: TutorState; status?: string; delay?: number; item?: ConvoItem }[] = [
  { action: 'wait', delay: 2000 },

  // Tutor opens
  ...tutorSpeaks("So trig. What do you remember?", 800),
  { action: 'wait', delay: 800 },

  // Student responds
  ...studentSpeaks("I know SOH CAH TOA but I always forget which one to use when"),

  // Tutor explains
  ...tutorSpeaks("That's the common sticking point. It comes down to which two sides you're working with. If one of them is the hypotenuse, it's sine or cosine. If neither is the hypotenuse, it's tangent."),
  { action: 'state', state: 'listening' },
  { action: 'wait', delay: 2000 },

  // Student checks understanding
  ...studentSpeaks("Ok so tangent is the odd one out. It's the one without the hypotenuse?"),

  // Tutor confirms with breakdown
  ...tutorSpeaks("Exactly. Here's how I think about it:", 1000),
  { action: 'wait', delay: 600 },
  { action: 'add', item: { type: 'breakdown', data: { title: 'Trig ratios', points: ['Hypotenuse + opposite = sine', 'Hypotenuse + adjacent = cosine', 'No hypotenuse = tangent'] } } },
  { action: 'state', state: 'listening' },
  { action: 'wait', delay: 3000 },

  // Student gets it
  ...studentSpeaks("Oh that's way simpler than trying to remember the formulas. Just look at what sides I have"),

  // Tutor presents activity
  ...tutorSpeaks("That's it. Try this one to see if it clicks:", 1000),
  { action: 'wait', delay: 600 },
  { action: 'add', item: { type: 'activity', data: { title: 'Pick the right ratio', description: 'A triangle with two labeled sides. Tap the ratio that connects them.' } } },
  { action: 'wait', delay: 2000 },
  // User opens the activity
  { action: 'openSheet', item: { text: 'Pick the right ratio' } },
  { action: 'wait', delay: 1500 },
  { action: 'closeSheet' },
  { action: 'wait', delay: 500 },
  { action: 'completeActivity' },
  { action: 'wait', delay: 800 },

  // Post-activity feedback
  ...tutorSpeaks("You got both right away. You know your sides.", 1000),
  { action: 'wait', delay: 1000 },

  // Student reflects
  ...studentSpeaks("Yeah that actually made it click. Seeing the triangle and placing the labels myself helped"),

  // Tutor wraps up with materials first, then video, then resources
  ...tutorSpeaks("Good. Here's a worked example and the class slides."),
  { action: 'wait', delay: 600 },
  { action: 'add', item: { type: 'workedexample', data: { title: 'Finding the missing side', steps: [
    { title: 'Identify the sides', content: 'Label the hypotenuse, opposite, and adjacent.' },
    { title: 'Pick the ratio', content: 'Hypotenuse + opposite = sine.' },
    { title: 'Solve', content: 'opposite = 15 × sin(35°) = 8.6' },
  ] } } },
  { action: 'wait', delay: 600 },
  { action: 'add', item: { type: 'slides', data: { title: 'Trig fundamentals', attribution: 'Ms. Al-Harbi', slides: [
    { uri: 'https://placehold.co/800x450/0a0f1a/e8e4dc?text=Slide+1' },
    { uri: 'https://placehold.co/800x450/0a0f1a/e8e4dc?text=Slide+2' },
  ] } } },
  { action: 'wait', delay: 600 },
  ...tutorSpeaks("And a walkthrough video and some additional reference."),
  { action: 'wait', delay: 600 },
  { action: 'add', item: { type: 'video', data: { title: 'When to use sin, cos, tan', attribution: 'Star Teacher — Ms. Al-Harbi', duration: '3:45' } } },
  { action: 'wait', delay: 600 },
  { action: 'add', item: { type: 'resources', data: { links: [{ label: 'SOH CAH TOA decision tree' }, { label: 'Quick reference card' }] } } },
  { action: 'state', state: 'idle' },
];

export function VoiceTutorSession({ onClose }: { onClose?: () => void }) {
  const { theme } = useTheme();
  const [items, setItems] = useState<ConvoItem[]>([]);
  const [tutorState, setTutorState] = useState<TutorState>('idle');
  const [statusText, setStatusText] = useState('Starting session...');
  const [showTyping, setShowTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [sheetTitle, setSheetTitle] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const ranRef = useRef(false);
  useEffect(() => {
    if (ranRef.current) return; // prevent double-run in strict mode
    ranRef.current = true;
    let cancelled = false;
    async function run() {
      for (const step of SCRIPT) {
        if (cancelled) return;
        if (step.action === 'wait') {
          await new Promise(r => setTimeout(r, step.delay));
        } else if (step.action === 'state') {
          setTutorState(step.state!);
        } else if (step.action === 'typing') {
          setShowTyping(true);
          await new Promise(r => setTimeout(r, step.delay));
          if (cancelled) return;
          setShowTyping(false);
        } else if (step.action === 'add') {
          setItems(prev => [...prev, step.item!]);
        } else if (step.action === 'tutorStream') {
          const text = step.item!.text!;
          const words = text.split(' ');
          // Show full text immediately, ghosted
          setItems(prev => [...prev, { type: 'tutor', text, revealedLength: 0 }]);
          // Reveal word by word
          for (let w = 0; w < words.length; w++) {
            if (cancelled) return;
            await new Promise(r => setTimeout(r, 80 + Math.random() * 60));
            const revealedLength = words.slice(0, w + 1).join(' ').length;
            setItems(prev => {
              const next = [...prev];
              next[next.length - 1] = { type: 'tutor', text, revealedLength };
              return next;
            });
          }
          // Fully reveal
          setItems(prev => {
            const next = [...prev];
            next[next.length - 1] = { type: 'tutor', text, revealedLength: text.length };
            return next;
          });
          await new Promise(r => setTimeout(r, 300));
        } else if (step.action === 'studentStream') {
          // Word-by-word unconfirmed student message
          const text = step.item!.text!;
          const words = text.split(' ');
          const idx = { current: 0 };
          // Add empty unconfirmed message
          setItems(prev => [...prev, { type: 'student', text: '', confirmed: false }]);
          for (let w = 0; w < words.length; w++) {
            if (cancelled) return;
            await new Promise(r => setTimeout(r, 150 + Math.random() * 200));
            const partial = words.slice(0, w + 1).join(' ');
            setItems(prev => {
              const next = [...prev];
              next[next.length - 1] = { type: 'student', text: partial, confirmed: false };
              return next;
            });
          }
          await new Promise(r => setTimeout(r, 500));
        } else if (step.action === 'completeActivity') {
          setItems(prev => {
            const next = [...prev];
            const idx = next.findLastIndex(it => it.type === 'activity');
            if (idx >= 0) next[idx] = { ...next[idx], data: { ...next[idx].data, complete: true } };
            return next;
          });
        } else if (step.action === 'openSheet') {
          setSheetTitle(step.item?.text || 'Activity');
        } else if (step.action === 'closeSheet') {
          setSheetTitle(null);
        } else if (step.action === 'confirmStudent') {
          // Confirm the last student message
          setItems(prev => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.type === 'student') next[next.length - 1] = { ...last, confirmed: true };
            return next;
          });
        }
      }
      if (!cancelled) setDone(true);
    }
    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [items, showTyping]);

  const renderItem = (item: ConvoItem, i: number) => {
    switch (item.type) {
      case 'tutor':
        return <ChatMessage key={i} from="tutor" revealedLength={item.revealedLength}>{item.text!}</ChatMessage>;
      case 'student':
        return <ChatMessage key={i} from="student" confirmed={item.confirmed !== false}>{item.text!}</ChatMessage>;
      case 'breakdown':
        return <BreakdownCard key={i} title={item.data.title} points={item.data.points} />;
      case 'activity':
        return <ActivityCard key={i} title={item.data.title} description={item.data.description} complete={item.data.complete} onPress={item.data.complete ? undefined : () => setSheetTitle(item.data.title)} />;
      case 'video':
        return <VideoCard key={i} title={item.data.title} attribution={item.data.attribution} duration={item.data.duration} />;
      case 'resources':
        return <ResourceList key={i} links={item.data.links.map((l: any) => ({ ...l, onPress: () => setSheetTitle(l.label) }))} />;
      case 'workedexample':
        return <WorkedExampleCard key={i} title={item.data.title} onPress={() => setSheetTitle('Worked example')} />;
      case 'slides':
        return <SlidesCard key={i} title={item.data.title} attribution={item.data.attribution} onPress={() => setSheetTitle(item.data.title)} slides={item.data.slides} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: insets.top }}>
      {/* Context bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: sp[3], paddingHorizontal: sp[5], borderBottomWidth: 1, borderBottomColor: theme.divider }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
          <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: color.danger[400] }} />
          <Text style={{ fontFamily: font.sans, fontSize: fs[15], fontWeight: fw[500], color: theme.fg }}>Trigonometry recap</Text>
        </View>
        <Pressable onPress={onClose}><Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fgSubtle }}>Close</Text></Pressable>
      </View>

      {/* Chat transcript */}
      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], gap: sp[5], paddingBottom: sp[8] }}>
        {items.map(renderItem)}
        {showTyping && <TypingIndicator />}
      </ScrollView>

      {/* Tutor panel */}
      {!done ? (
        <View style={{ borderTopWidth: 1, borderTopColor: theme.divider, backgroundColor: theme.hoverOverlay, alignItems: 'center', paddingVertical: sp[5], paddingBottom: sp[5] + insets.bottom }}>
          <VoiceTutor state={tutorState} size={80} />
        </View>
      ) : (
        <View style={{ borderTopWidth: 1, borderTopColor: theme.divider, backgroundColor: theme.hoverOverlay, padding: sp[5], paddingBottom: sp[5] + insets.bottom }}>
          <Button fullWidth onPress={onClose}>Continue to questions</Button>
        </View>
      )}

      {/* FullSheet for tapped blocks */}
      <FullSheet visible={!!sheetTitle} onClose={() => setSheetTitle(null)} title={sheetTitle || ''}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgFaint, textAlign: 'center', marginTop: sp[5] }}>Content will appear here</Text>
      </FullSheet>
    </View>
  );
}
