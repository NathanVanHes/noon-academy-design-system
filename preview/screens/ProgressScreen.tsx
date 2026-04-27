import React from 'react';
import { View } from 'react-native';
import { SessionBar, RouteSteps, LinearProgress, CircularProgress, useTheme, sp, color } from '../../rn';
import { Screen, PageHeader, Section, Label, Row, Cell, Spec, Rule } from './ExplorerShell';

export function ProgressScreen() {
  return (
    <Screen>
      <PageHeader title="Progress" desc="Session bars, route steps, linear and circular progress indicators." />

      <Section title="Session Bar" desc="Question-by-question results. Each segment = one question.">
        <Cell label="Default (6 questions, 4 answered)">
          <SessionBar segments={['correct', 'correct', 'incorrect', 'correct', 'pending', 'pending']} />
        </Cell>
        <Cell label="Large">
          <SessionBar segments={['correct', 'correct', 'correct', 'correct', 'correct']} size="lg" />
        </Cell>
        <Cell label="Small">
          <SessionBar segments={['correct', 'incorrect', 'correct', 'correct', 'incorrect', 'correct', 'correct', 'correct']} size="sm" />
        </Cell>
      </Section>

      <Section title="Route Steps" desc="Diamond waypoints showing position on the journey.">
        <Cell label="In progress (3 of 5)">
          <RouteSteps steps={['done', 'done', 'current', 'incomplete', 'incomplete']} />
        </Cell>
        <Cell label="Complete (5 of 5)">
          <RouteSteps steps={['done', 'done', 'done', 'done', 'done']} />
        </Cell>
        <Cell label="Just started (1 of 7)">
          <RouteSteps steps={['current', 'incomplete', 'incomplete', 'incomplete', 'incomplete', 'incomplete', 'incomplete']} />
        </Cell>
        <Rule>Done: solid gold diamond. Current: bright gold with glow. Incomplete: outline at 55% opacity.</Rule>
      </Section>

      <Section title="Linear Progress">
        <Cell label="76%"><LinearProgress value={76} /></Cell>
        <Cell label="100% (accent)"><LinearProgress value={100} color={color.noon[400]} /></Cell>
        <Cell label="25% (danger)"><LinearProgress value={25} color={color.danger[400]} /></Cell>
      </Section>

      <Section title="Circular Progress">
        <Row gap={sp[4]}>
          <CircularProgress value={76} showValue />
          <CircularProgress value={100} showValue color={color.noon[400]} />
          <CircularProgress value={25} showValue color={color.danger[400]} />
          <CircularProgress value={0} showValue />
        </Row>
      </Section>
    </Screen>
  );
}
