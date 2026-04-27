import React from 'react';
import { SessionCard, useTheme, sp } from '../../rn';
import { Screen, PageHeader, Section, Cell, Rule, Spec } from './ExplorerShell';

export function SessionCardsScreen() {
  return (
    <Screen>
      <PageHeader title="Session Card" desc="List-item for scheduled classes. Time, indicator, title, status." />

      <Section title="All States">
        <Cell label="Live">
          <SessionCard time="8:30" title="Storytelling" meta="Digital Media — Ms. Al-Harbi" state="live" />
        </Cell>
        <Cell label="Soon">
          <SessionCard time="10:00" title="Inference & implied meaning" meta="Qudrat Reading — Mr. Hassan" state="soon" />
        </Cell>
        <Cell label="Upcoming">
          <SessionCard time="11:30" title="Quantitative reasoning" meta="Qudrat Math — Ms. Noor" state="upcoming" statusText="3:00" />
        </Cell>
        <Cell label="Ended">
          <SessionCard time="7:00" title="Reading comprehension" meta="Qudrat Reading — Mr. Hassan" state="done" />
        </Cell>
        <Cell label="Cancelled">
          <SessionCard time="14:30" title="Crew discussion" meta="Facilitated — Omar's crew" state="cancelled" />
        </Cell>
      </Section>

      <Section title="Specs">
        <Spec label="Padding" value="sp-4 / sp-5 (16 / 20)" />
        <Spec label="Gap" value="sp-4 (16px)" />
        <Spec label="Divider" value="1px border-bottom, divider color" />
        <Spec label="Time font" value="mono, fs-12, fg-faint" />
        <Spec label="Title font" value="sans, fs-14, fw-500" />
        <Spec label="Meta font" value="sans, fs-12, fg-faint" />
        <Spec label="Live indicator" value="accent dot" />
        <Spec label="Soon text" value="signal-bright" />
        <Spec label="Ended text" value="fg-muted" />
        <Spec label="Cancelled text" value="danger" />
      </Section>

      <Section title="Rules">
        <Rule>Live gets accent indicator dot and chip with "Live".</Rule>
        <Rule>Soon shows in signal-bright (yellow).</Rule>
        <Rule>Ended title text fades to fg-muted.</Rule>
        <Rule>Upcoming shows countdown time on the right.</Rule>
        <Rule>Press opens bottom sheet with session details.</Rule>
      </Section>
    </Screen>
  );
}
