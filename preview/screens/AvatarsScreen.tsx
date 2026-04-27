import React from 'react';
import { Avatar, Badge, useTheme, sp } from '../../rn';
import { Screen, PageHeader, Section, Label, Row, Cell, Spec, Rule } from './ExplorerShell';

export function AvatarsScreen() {
  return (
    <Screen>
      <PageHeader title="Avatars & Badges" desc="Initials in colored circles. Badges for counts and status dots." />

      <Section title="Avatar Sizes">
        <Row gap={sp[3]}>
          <Avatar initials="S" size="xs" />
          <Avatar initials="S" size="sm" />
          <Avatar initials="S" size="md" />
          <Avatar initials="S" size="lg" />
          <Avatar initials="S" size="xl" />
        </Row>
        <Spec label="xs / sm / md / lg / xl" value="24 / 32 / 40 / 56 / 72" />
      </Section>

      <Section title="Color Variants">
        <Row gap={sp[3]}>
          <Avatar initials="S" size="md" />
          <Avatar initials="S" size="md" color="noon" />
          <Avatar initials="F" size="md" color="iris" />
        </Row>
      </Section>

      <Section title="Indicators">
        <Row gap={sp[3]}>
          <Avatar initials="S" size="md" color="noon" star />
          <Avatar initials="O" size="md" status="online" />
          <Avatar initials="A" size="md" status="busy" />
        </Row>
        <Rule>Star: gold diamond at bottom-end. Used for journey/mastery indicators.</Rule>
        <Rule>Status: green (online) or red (busy) dot with bg ring.</Rule>
      </Section>

      <Section title="Badges">
        <Row gap={sp[3]}>
          <Badge>3</Badge>
          <Badge variant="accent">12</Badge>
          <Badge variant="danger">!</Badge>
          <Badge variant="dot" />
        </Row>
        <Spec label="Min width / height" value="18px" />
        <Spec label="Font" value="mono, fs-10, fw-500" />
      </Section>
    </Screen>
  );
}
