import React from 'react';
import { View, Text } from 'react-native';
import { Button, IconButton, useTheme, sp, fs, fw, font } from '../../rn';
import { Screen, PageHeader, Section, Label, Row, Cell, Rule, Spec } from './ExplorerShell';

export function ButtonsScreen() {
  const { theme } = useTheme();

  return (
    <Screen>
      <PageHeader title="Buttons" desc="Use for primary actions, confirmations, and navigation triggers. Choose variant by importance." />

      <Section title="Variants" desc="Primary for the main action. Secondary for alternatives. Ghost for low-emphasis. Danger for destructive. Signal for journey actions only.">
        <Cell label="Primary">
          <Button variant="primary">Primary action</Button>
        </Cell>
        <Cell label="Secondary (outline)">
          <Button variant="secondary">Secondary</Button>
        </Cell>
        <Cell label="Ghost">
          <Button variant="ghost">Ghost</Button>
        </Cell>
        <Cell label="Danger (outline)">
          <Button variant="danger">Delete</Button>
        </Cell>
        <Cell label="Danger solid">
          <Button variant="danger-solid">Confirm delete</Button>
        </Cell>
        <Cell label="Signal (gold — journey actions ONLY)">
          <Button variant="signal">Mark arrival</Button>
        </Cell>
      </Section>

      <Section title="Sizes">
        <Cell label="Small (32px)">
          <Button size="sm">Small</Button>
        </Cell>
        <Cell label="Medium — default (40px)">
          <Button size="md">Medium</Button>
        </Cell>
        <Cell label="Large (48px)">
          <Button size="lg">Large</Button>
        </Cell>
      </Section>

      <Section title="States">
        <Cell label="Loading">
          <Row>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="secondary" loading>Loading</Button>
          </Row>
        </Cell>
        <Cell label="Disabled">
          <Row>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled</Button>
            <Button variant="ghost" disabled>Disabled</Button>
          </Row>
        </Cell>
        <Cell label="Block (full width)">
          <Button block>Full width button</Button>
        </Cell>
      </Section>

      <Section title="Icon Buttons">
        <Row gap={sp[3]}>
          <IconButton><Text style={{ color: theme.fgMuted }}>←</Text></IconButton>
          <IconButton variant="primary"><Text style={{ color: theme.accentFg }}>+</Text></IconButton>
          <IconButton variant="ghost"><Text style={{ color: theme.fgMuted }}>⋮</Text></IconButton>
          <IconButton variant="danger"><Text style={{ color: theme.danger }}>✕</Text></IconButton>
        </Row>
        <Label>Sizes</Label>
        <Row gap={sp[3]}>
          <IconButton size="sm"><Text style={{ color: theme.fgMuted, fontSize: fs[12] }}>←</Text></IconButton>
          <IconButton size="md"><Text style={{ color: theme.fgMuted }}>←</Text></IconButton>
          <IconButton size="lg"><Text style={{ color: theme.fgMuted, fontSize: fs[18] }}>←</Text></IconButton>
        </Row>
      </Section>

      <Section title="Specs">
        <Spec label="Height sm / md / lg" value="32 / 40 / 48" />
        <Spec label="Padding sm / md / lg" value="12 / 20 / 24" />
        <Spec label="Border radius" value="r-2 (4px)" />
        <Spec label="Font" value="sans, fs-14, fw-600" />
        <Spec label="Letter spacing" value="-0.07 (tr-snug)" />
        <Spec label="Press feedback" value="opacity 0.9, translateY 0.5" />
      </Section>

      <Section title="Rules">
        <Rule>Primary for the single most important action on screen. One per view.</Rule>
        <Rule>Secondary for alternatives that aren't the main action.</Rule>
        <Rule>Ghost for low-emphasis actions in toolbars, cards, and inline contexts.</Rule>
        <Rule>Danger outline for reversible destructive actions. Danger solid for irreversible ones — always behind a confirmation dialog.</Rule>
        <Rule>Signal is ONLY for journey waypoint actions: mark arrival, confirm route, current position. Never for general UI.</Rule>
      </Section>
    </Screen>
  );
}
