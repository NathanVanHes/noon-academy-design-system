import React from 'react';
import { View } from 'react-native';
import { Alert, useTheme, sp } from '../../rn';
import { Screen, PageHeader, Section, Cell, Rule, Spec } from './ExplorerShell';

export function AlertsScreen() {
  return (
    <Screen>
      <PageHeader title="Alerts" desc="Inline feedback banners. Use for confirmations, warnings, errors, and information." />

      <Section title="All Variants">
        <Cell label="Info">
          <Alert variant="info" title="Information">This is a general informational message.</Alert>
        </Cell>
        <View style={{ height: sp[2] }} />
        <Cell label="OK / Success">
          <Alert variant="ok" title="Success">Practice session completed successfully.</Alert>
        </Cell>
        <View style={{ height: sp[2] }} />
        <Cell label="Warning">
          <Alert variant="warn" title="Warning">Your exam is in 2 days. 3 topics still unresolved.</Alert>
        </Cell>
        <View style={{ height: sp[2] }} />
        <Cell label="Danger / Error">
          <Alert variant="danger" title="Error">Something went wrong. Please try again.</Alert>
        </Cell>
      </Section>

      <Section title="Without title">
        <Alert variant="warn">Your exam is in 2 days.</Alert>
      </Section>

      <Section title="Specs">
        <Spec label="Background" value="bg-raised (all variants)" />
        <Spec label="Border" value="1px colored per variant" />
        <Spec label="Border radius" value="r-2 (4px)" />
        <Spec label="Padding" value="sp-4 / sp-5 (16 / 20)" />
        <Spec label="Gap" value="sp-3 (12px)" />
        <Spec label="Title font" value="sans, fs-14, fw-600" />
        <Spec label="Body font" value="sans, fs-13, fg-muted" />
      </Section>

      <Section title="Rules">
        <Rule>Background is always bg-raised. Variant only changes the border color.</Rule>
        <Rule>Title is optional. Body is required.</Rule>
        <Rule>Use info for neutral messages, ok for success, warn for attention, danger for errors.</Rule>
      </Section>
    </Screen>
  );
}
