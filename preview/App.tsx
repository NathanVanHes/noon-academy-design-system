import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { CrimsonPro_400Regular, CrimsonPro_500Medium } from '@expo-google-fonts/crimson-pro';
import { JetBrainsMono_400Regular, JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import { Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_600SemiBold, Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn';
import { ThemeProvider, useTheme, Segmented, sp, fs, fw, font, r } from '../rn';
import {
  ButtonsPage, InputsPage, ControlsPage, ChipsPage, AvatarsPage,
  CardsPage, AlertsPage, SessionCardsPage, ProgressPage, QuizPage,
  TabsPage, TablePage, OverlaysPage, SkeletonPage, EmptyStatePage, TokensPage,
} from './screens/pages';

// ─── Nav structure ───
const NAV = [
  { group: 'Foundation', items: [
    { id: 'tokens', label: 'Tokens & Colors', page: TokensPage },
  ]},
  { group: 'Actions', items: [
    { id: 'buttons', label: 'Buttons', page: ButtonsPage },
  ]},
  { group: 'Inputs', items: [
    { id: 'inputs', label: 'Text Input', page: InputsPage },
    { id: 'controls', label: 'Controls', page: ControlsPage },
  ]},
  { group: 'Selection', items: [
    { id: 'chips', label: 'Chips', page: ChipsPage },
    { id: 'quiz', label: 'Quiz Option', page: QuizPage },
    { id: 'tabs', label: 'Tabs & Filters', page: TabsPage },
  ]},
  { group: 'Display', items: [
    { id: 'cards', label: 'Cards', page: CardsPage },
    { id: 'avatars', label: 'Avatars & Badges', page: AvatarsPage },
    { id: 'tables', label: 'Tables', page: TablePage },
    { id: 'session', label: 'Session Card', page: SessionCardsPage },
  ]},
  { group: 'Progress', items: [
    { id: 'progress', label: 'Progress', page: ProgressPage },
  ]},
  { group: 'Feedback', items: [
    { id: 'alerts', label: 'Alerts', page: AlertsPage },
    { id: 'overlays', label: 'Overlays', page: OverlaysPage },
  ]},
  { group: 'Layout', items: [
    { id: 'empty', label: 'Empty State', page: EmptyStatePage },
    { id: 'skeleton', label: 'Skeleton', page: SkeletonPage },
  ]},
];

const allPages = NAV.flatMap(g => g.items);

// ─── Menu Screen ───
function MenuScreen({ onSelect }: { onSelect: (id: string) => void }) {
  const { theme } = useTheme();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], paddingBottom: sp[10] }}>
      {NAV.map(group => (
        <View key={group.group} style={{ marginBottom: sp[5] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: sp[2] }}>{group.group}</Text>
          {group.items.map(item => (
            <Pressable
              key={item.id}
              onPress={() => onSelect(item.id)}
              style={({ pressed }) => ({
                paddingVertical: sp[3],
                paddingHorizontal: sp[4],
                borderRadius: r[2],
                backgroundColor: pressed ? theme.activeOverlay : 'transparent',
                marginBottom: sp[0.5],
              })}
            >
              <Text style={{ fontFamily: font.sans, fontSize: fs[15], color: theme.fg }}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Explorer ───
function Explorer() {
  const { theme, mode, setMode } = useTheme();
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const page = allPages.find(p => p.id === currentPage);
  const PageComponent = page?.page;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle={mode === 'void' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: sp[4], paddingVertical: sp[3], borderBottomWidth: 1, borderBottomColor: theme.border, gap: sp[3] }}>
        {currentPage && (
          <Pressable onPress={() => setCurrentPage(null)} hitSlop={8}>
            <Text style={{ fontSize: fs[18], color: theme.fgMuted }}>‹</Text>
          </Pressable>
        )}
        <Text style={{ fontFamily: font.serif, fontSize: fs[18], color: theme.fg, flex: 1 }} numberOfLines={1}>
          {page ? page.label : 'Proven Routes'}
        </Text>
        <Segmented options={['Void', 'Paper']} selected={mode === 'void' ? 0 : 1} onSelect={(i) => setMode(i === 0 ? 'void' : 'paper')} />
      </View>

      {/* Content */}
      {!currentPage ? (
        <MenuScreen onSelect={setCurrentPage} />
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], paddingBottom: sp[12] }}>
          {PageComponent && <PageComponent />}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    CrimsonPro: CrimsonPro_400Regular,
    'CrimsonPro-Medium': CrimsonPro_500Medium,
    Vazirmatn: Vazirmatn_400Regular,
    'Vazirmatn-Medium': Vazirmatn_500Medium,
    'Vazirmatn-SemiBold': Vazirmatn_600SemiBold,
    'Vazirmatn-Bold': Vazirmatn_700Bold,
    JetBrainsMono: JetBrainsMono_400Regular,
    'JetBrainsMono-Medium': JetBrainsMono_500Medium,
  });
  if (!fontsLoaded) return null;
  return (
    <ThemeProvider initial="void">
      <Explorer />
    </ThemeProvider>
  );
}
