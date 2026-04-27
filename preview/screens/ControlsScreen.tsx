import React, { useState } from 'react';
import { View } from 'react-native';
import { Switch, Checkbox, Radio, Stepper, Segmented, Input, Textarea, useTheme, sp } from '../../rn';
import { Screen, PageHeader, Section, Label, Row, Cell, Spec } from './ExplorerShell';

export function ControlsScreen() {
  const [sw, setSw] = useState(true);
  const [ch1, setCh1] = useState(true);
  const [ch2, setCh2] = useState(false);
  const [rad, setRad] = useState(0);
  const [step, setStep] = useState(3);
  const [seg, setSeg] = useState(0);

  return (
    <Screen>
      <PageHeader title="Controls" desc="Interactive input controls — switches, checkboxes, radios, steppers, segmented." />

      <Section title="Switch">
        <Row gap={sp[4]}>
          <Cell label="On"><Switch value={sw} onValueChange={setSw} /></Cell>
          <Cell label="Off"><Switch value={false} onValueChange={() => {}} /></Cell>
          <Cell label="Disabled"><Switch value={true} onValueChange={() => {}} disabled /></Cell>
        </Row>
      </Section>

      <Section title="Checkbox">
        <Row gap={sp[4]}>
          <Cell label="Checked"><Checkbox checked={ch1} onChange={setCh1} /></Cell>
          <Cell label="Unchecked"><Checkbox checked={ch2} onChange={setCh2} /></Cell>
          <Cell label="Disabled"><Checkbox checked={true} onChange={() => {}} disabled /></Cell>
          <Cell label="Indeterminate"><Checkbox checked={false} onChange={() => {}} indeterminate /></Cell>
        </Row>
      </Section>

      <Section title="Radio">
        <Row gap={sp[4]}>
          <Cell label="Option 1"><Radio selected={rad === 0} onSelect={() => setRad(0)} /></Cell>
          <Cell label="Option 2"><Radio selected={rad === 1} onSelect={() => setRad(1)} /></Cell>
          <Cell label="Option 3"><Radio selected={rad === 2} onSelect={() => setRad(2)} /></Cell>
          <Cell label="Disabled"><Radio selected={false} onSelect={() => {}} disabled /></Cell>
        </Row>
      </Section>

      <Section title="Stepper">
        <Cell label="Value: {step}">
          <Stepper value={step} min={0} max={10} onChange={setStep} />
        </Cell>
      </Section>

      <Section title="Segmented">
        <Cell label="3 options">
          <Segmented options={['Day', 'Week', 'Month']} selected={seg} onSelect={setSeg} />
        </Cell>
      </Section>

      <Section title="Text Input">
        <Cell label="Default"><Input placeholder="Enter text" /></Cell>
        <Cell label="With label"><Input label="Name" placeholder="Your name" /></Cell>
        <Cell label="Error"><Input label="Email" placeholder="email@noon.com" error="Invalid email" /></Cell>
        <Cell label="Disabled"><Input label="Locked" placeholder="Can't edit" disabled /></Cell>
      </Section>

      <Section title="Textarea">
        <Cell label="Default"><Textarea placeholder="Write something..." rows={3} /></Cell>
        <Cell label="With error"><Textarea label="Notes" placeholder="..." error="Required" /></Cell>
      </Section>
    </Screen>
  );
}
