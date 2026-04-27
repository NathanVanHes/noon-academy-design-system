import React from 'react';
import { View } from 'react-native';
import { QuizOption, useTheme, sp } from '../../rn';
import { Screen, PageHeader, Section, Cell, Spec, Rule } from './ExplorerShell';

export function QuizScreen() {
  return (
    <Screen>
      <PageHeader title="Quiz Option" desc="A/B/C/D selector for quizzes. Blue for selected (not green — green means correct)." />

      <Section title="All States">
        <Cell label="Default">
          <QuizOption label="A" text="The land is completely useless" />
        </Cell>
        <Cell label="Selected (blue — not green)">
          <QuizOption label="B" text="There is hidden potential despite appearances" state="selected" />
        </Cell>
        <Cell label="Correct (green)">
          <QuizOption label="B" text="There is hidden potential despite appearances" state="correct" />
        </Cell>
        <Cell label="Incorrect (red)">
          <QuizOption label="D" text="The landscape will change soon" state="incorrect" />
        </Cell>
        <Cell label="Disabled">
          <QuizOption label="C" text="The author dislikes the setting" state="disabled" />
        </Cell>
      </Section>

      <Section title="Specs">
        <Spec label="Padding" value="sp-3 / sp-4 (12 / 16)" />
        <Spec label="Border radius" value="r-3 (6px)" />
        <Spec label="Border" value="1px, colored per state" />
        <Spec label="Label size" value="28x28, r-1, mono fs-13 fw-600" />
        <Spec label="Text font" value="sans, fs-15, fg" />
        <Spec label="Selected" value="blue-400 border, blue 8% bg" />
        <Spec label="Correct" value="accent border, accent-soft bg" />
        <Spec label="Incorrect" value="danger border, danger-soft bg" />
      </Section>

      <Section title="Rules">
        <Rule>Selected is BLUE, not green. Green = correct answer revealed.</Rule>
        <Rule>After answering, only correct/incorrect states show. Other options become disabled.</Rule>
        <Rule>Label (A/B/C/D) changes color to match the state.</Rule>
      </Section>
    </Screen>
  );
}
