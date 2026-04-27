import React from 'react';
import { Text } from 'react-native';
import { Card, useTheme, sp, fs, fw, font } from '../../rn';
import { Screen, PageHeader, Section, Cell, Rule, Spec } from './ExplorerShell';

export function CardsScreen() {
  const { theme } = useTheme();
  const body = (t: string) => <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>{t}</Text>;
  const sub = (t: string) => <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[1] }}>{t}</Text>;

  return (
    <Screen>
      <PageHeader title="Cards" desc="Content containers for passages, crew members, schedules, and any grouped information." />

      <Section title="Variants">
        <Cell label="Default">
          <Card>
            <Text style={{ fontFamily: font.serif, fontSize: fs[18], color: theme.fg }}>Card title</Text>
            {sub('Card body text with content description.')}
          </Card>
        </Cell>
        <Cell label="Interactive (press me)">
          <Card interactive onPress={() => {}}>
            {body('Interactive card — press for feedback')}
          </Card>
        </Cell>
      </Section>

      <Section title="States">
        <Cell label="Selected">
          <Card selected>{body('Selected card')}</Card>
        </Cell>
        <Cell label="Error">
          <Card error>{body('Error card')}</Card>
        </Cell>
        <Cell label="Live (accent left border)">
          <Card live>{body('Live card')}</Card>
        </Cell>
        <Cell label="Loading (0.6 opacity)">
          <Card loading>{body('Loading card')}</Card>
        </Cell>
      </Section>

      <Section title="Specs">
        <Spec label="Background" value="bg-raised" />
        <Spec label="Border" value="1px border (inset)" />
        <Spec label="Border radius" value="r-2 (4px)" />
        <Spec label="Padding" value="sp-5 / sp-6 (20 / 24)" />
        <Spec label="Selected border" value="accent-soft" />
        <Spec label="Error border" value="danger-soft" />
        <Spec label="Live" value="3px accent start border" />
      </Section>

      <Section title="Rules">
        <Rule>Use interactive variant for clickable cards only.</Rule>
        <Rule>One selected card per group maximum.</Rule>
        <Rule>Loading disables interaction and reduces opacity to 0.6.</Rule>
        <Rule>Live border is inline-start only — works in RTL.</Rule>
      </Section>
    </Screen>
  );
}
