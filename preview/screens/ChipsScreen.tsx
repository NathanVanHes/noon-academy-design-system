import React from 'react';
import { Chip, useTheme, sp } from '../../rn';
import { Screen, PageHeader, Section, Label, Row, Cell, Rule, Spec } from './ExplorerShell';

export function ChipsScreen() {
  return (
    <Screen>
      <PageHeader title="Chips" desc="Compact labels for status, categories, and tags. Use interactive chips for selection, static chips for display." />

      <Section title="All Variants">
        <Cell label="Default">
          <Chip>Topic name</Chip>
        </Cell>
        <Cell label="Accent (active/selected)">
          <Chip variant="accent">Active filter</Chip>
        </Cell>
        <Cell label="Signal (with dot)">
          <Chip variant="signal" dot>Live</Chip>
        </Cell>
        <Cell label="Danger">
          <Chip variant="danger">Overdue</Chip>
        </Cell>
        <Cell label="OK">
          <Chip variant="ok">Completed</Chip>
        </Cell>
      </Section>

      <Section title="States">
        <Cell label="Interactive (tappable)">
          <Row>
            <Chip interactive onPress={() => {}}>Tap me</Chip>
            <Chip variant="accent" interactive onPress={() => {}}>Active</Chip>
          </Row>
        </Cell>
        <Cell label="Disabled">
          <Chip disabled>Disabled</Chip>
        </Cell>
        <Cell label="Many chips wrapping">
          <Row>
            {'ABCDEFGHIJ'.split('').map(c => (
              <Chip key={c} interactive onPress={() => {}}>Topic {c}</Chip>
            ))}
          </Row>
        </Cell>
      </Section>

      <Section title="Specs">
        <Spec label="Height" value="28px" />
        <Spec label="Padding" value="sp-3 (12px)" />
        <Spec label="Gap (internal)" value="sp-2 (8px)" />
        <Spec label="Border radius" value="r-1 (2px)" />
        <Spec label="Font" value="sans, fs-12, fw-500" />
        <Spec label="Border" value="1px inset, colored per variant" />
      </Section>

      <Section title="Rules">
        <Rule>Default chip for neutral labels and categories.</Rule>
        <Rule>Accent for active/selected state in filter bars.</Rule>
        <Rule>Signal with dot for live indicators only.</Rule>
        <Rule>Danger for overdue, expired, or warning states.</Rule>
        <Rule>Interactive chips have press feedback. Static chips don't respond to touch.</Rule>
      </Section>
    </Screen>
  );
}
