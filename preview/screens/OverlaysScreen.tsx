import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Dialog, BottomSheet, Toast, Divider, useTheme, sp, fs, fw, font } from '../../rn';
import { Screen, PageHeader, Section, Cell, Row, Rule, Spec } from './ExplorerShell';

export function OverlaysScreen() {
  const { theme } = useTheme();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dangerDialogVisible, setDangerDialogVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [fullSheetVisible, setFullSheetVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  return (
    <Screen>
      <PageHeader title="Overlays" desc="Dialogs, bottom sheets, and toasts. Tap buttons to see them." />

      <Section title="Dialog">
        <Cell label="Default confirmation">
          <Button variant="secondary" onPress={() => setDialogVisible(true)}>Open Dialog</Button>
        </Cell>
        <Cell label="Danger confirmation">
          <Button variant="danger" onPress={() => setDangerDialogVisible(true)}>Delete Dialog</Button>
        </Cell>
        <Spec label="Width" value="max 320px, centered" />
        <Spec label="Radius" value="r-3 (6px)" />
        <Spec label="Animation" value="fade, scale 0.95→1" />
      </Section>

      <Section title="Bottom Sheet">
        <Cell label="Auto-size (fits content)">
          <Button variant="secondary" onPress={() => setSheetVisible(true)}>Open Sheet</Button>
        </Cell>
        <Cell label="Full (90% height)">
          <Button variant="secondary" onPress={() => setFullSheetVisible(true)}>Full Sheet</Button>
        </Cell>
        <Spec label="Radius" value="r-4 (8px) top corners" />
        <Spec label="Handle" value="32×sp-1 pill, fg-faint 30%" />
        <Spec label="Scrim" value="rgba(6,9,19,0.5)" />
        <Spec label="Animation" value="slide up, 320ms" />
        <Rule>Mobile only. On tablet/desktop, use modal or side panel.</Rule>
        <Rule>Swipe down to dismiss. Tap scrim to dismiss.</Rule>
      </Section>

      <Section title="Toast">
        <Cell label="Success toast (auto-dismiss 4s)">
          <Button variant="secondary" onPress={() => setToastVisible(true)}>Show Toast</Button>
        </Cell>
        <Spec label="Position" value="top, sp-10 from top" />
        <Spec label="Duration" value="4000ms auto-dismiss" />
        <Spec label="Animation" value="slide down from top" />
      </Section>

      {/* Modals */}
      <Dialog visible={dialogVisible} onClose={() => setDialogVisible(false)} title="Are you sure?" body="This action cannot be undone. Your progress will be lost." />
      <Dialog visible={dangerDialogVisible} onClose={() => setDangerDialogVisible(false)} title="Delete this topic?" body="All practice history will be permanently removed." danger primaryLabel="Delete" onPrimary={() => setDangerDialogVisible(false)} />
      <BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} title="Inference & implied meaning" actions={<Row><View style={{ flex: 1 }}><Button variant="ghost">Close</Button></View><View style={{ flex: 1 }}><Button variant="primary">Join class</Button></View></Row>}>
        <View style={{ gap: sp[3] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[14], color: theme.fg }}>10:00 — 10:45</Text>
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Qudrat Reading — Mr. Hassan</Text>
          <Divider />
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>45 minutes · Room 3A</Text>
        </View>
      </BottomSheet>
      <BottomSheet visible={fullSheetVisible} onClose={() => setFullSheetVisible(false)} title="Full sheet" full>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted }}>This sheet takes 90% of the screen height and scrolls internally.</Text>
      </BottomSheet>
      <Toast message="Practice session saved" variant="ok" visible={toastVisible} onDismiss={() => setToastVisible(false)} />
    </Screen>
  );
}
