import { useState, type ReactNode } from 'react';
import {
  Lab21Button,
  Lab21Card,
  Lab21Badge,
  Lab21Input,
  Lab21Switch,
  Lab21Slider,
  Lab21Progress,
  Lab21Checkbox,
  Lab21Select,
  Lab21RadioGroup,
  Lab21Tabs,
  Lab21Dialog,
} from '@lab21/react';
import './types';

/* ---------- types ---------- */

interface PropRow {
  name: string;
  type: string;
  def?: string;
  desc: string;
}

type ControlType = 'select' | 'boolean' | 'number' | 'text';

interface Control {
  key: string;
  label: string;
  type: ControlType;
  options?: string[];
  default: any;
  isArray?: boolean;
}

interface DocEntry {
  tag: string;
  reactTag: string;
  name: string;
  desc: string;
  props: PropRow[];
  events?: string[];
  controls: Control[];
  customize: string;
  preview: (v: Record<string, any>, onEvent: (e: any) => void) => ReactNode;
}

/* ---------- code generation ---------- */

function buildAttrs(values: Record<string, any>, controls: Control[], flavor: 'html' | 'react' | 'vue'): string {
  const parts: string[] = [];
  for (const c of controls) {
    if (c.key === 'content') continue;
    const v = values[c.key];
    if (c.isArray) {
      const arr = String(v ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (arr.length === 0) continue;
      if (flavor === 'html') parts.push(`${c.key}='${JSON.stringify(arr)}'`);
      else if (flavor === 'react') parts.push(`${c.key}={${JSON.stringify(arr)}}`);
      else parts.push(`:${c.key}="${JSON.stringify(arr)}"`);
      continue;
    }
    if (c.type === 'boolean') {
      if (v === true) parts.push(c.key);
      continue;
    }
    if (v === '' || v === undefined || v === null) continue;
    if (c.type === 'number') {
      if (flavor === 'html') parts.push(`${c.key}="${v}"`);
      else if (flavor === 'react') parts.push(`${c.key}={${v}}`);
      else parts.push(`:${c.key}="${v}"`);
    } else {
      parts.push(`${c.key}="${v}"`);
    }
  }
  return parts.join(' ');
}

function genCode(entry: DocEntry, values: Record<string, any>, flavor: 'html' | 'react' | 'vue'): string {
  const attrs = buildAttrs(values, entry.controls, flavor);
  const contentCtrl = entry.controls.find((c) => c.key === 'content');
  const inner = contentCtrl ? values['content'] ?? '' : '';
  const open = attrs ? `<${entry.tag} ${attrs}>` : `<${entry.tag}>`;
  const close = `</${entry.tag}>`;
  if (flavor === 'html') return `${open}${inner}${close}`;
  const rOpen = attrs ? `<${entry.reactTag} ${attrs}>` : `<${entry.reactTag}>`;
  const rClose = `</${entry.reactTag}>`;
  return `${rOpen}${inner}${rClose}`;
}

/* ---------- docs data ---------- */

const DOCS: DocEntry[] = [
  {
    tag: 'lab21-button',
    reactTag: 'Lab21Button',
    name: 'Button',
    desc: 'Primary action trigger with chamfered corners. Three variants and three sizes.',
    props: [
      { name: 'variant', type: "'default' | 'outline' | 'ghost'", def: "'default'", desc: 'Visual style.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", def: "'md'", desc: 'Control height/padding.' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Disable interaction.' },
    ],
    controls: [
      { key: 'variant', label: 'variant', type: 'select', options: ['default', 'outline', 'ghost'], default: 'default' },
      { key: 'size', label: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
      { key: 'disabled', label: 'disabled', type: 'boolean', default: false },
      { key: 'content', label: 'text', type: 'text', default: 'Launch' },
    ],
    customize: `lab21-button {
  --lab21-accent: #00e0ff;
}`,
    preview: (v, _on) => (
      <Lab21Button variant={v.variant} size={v.size} disabled={v.disabled}>
        {v.content}
      </Lab21Button>
    ),
  },
  {
    tag: 'lab21-card',
    reactTag: 'Lab21Card',
    name: 'Card',
    desc: 'Surface container with chamfered corners for grouping content.',
    props: [{ name: 'elevation', type: "'flat' | 'raised'", def: "'flat'", desc: 'Adds a drop shadow when "raised".' }],
    controls: [
      { key: 'elevation', label: 'elevation', type: 'select', options: ['flat', 'raised'], default: 'raised' },
      { key: 'content', label: 'text', type: 'text', default: 'Card content' },
    ],
    customize: `lab21-card {
  --lab21-surface: #1c1c1c;
  --lab21-border: #333;
}`,
    preview: (v, _on) => (
      <Lab21Card elevation={v.elevation}>
        <p className="text-sm text-lab-light">{v.content}</p>
      </Lab21Card>
    ),
  },
  {
    tag: 'lab21-badge',
    reactTag: 'Lab21Badge',
    name: 'Badge',
    desc: 'Compact status indicator. Slot-based content.',
    props: [{ name: 'variant', type: "'default' | 'secondary' | 'outline'", def: "'default'", desc: 'Visual style.' }],
    controls: [
      { key: 'variant', label: 'variant', type: 'select', options: ['default', 'secondary', 'outline'], default: 'outline' },
      { key: 'content', label: 'text', type: 'text', default: 'Online' },
    ],
    customize: `lab21-badge {
  --lab21-accent: #2ecc71;
}`,
    preview: (v, _on) => <Lab21Badge variant={v.variant}>{v.content}</Lab21Badge>,
  },
  {
    tag: 'lab21-input',
    reactTag: 'Lab21Input',
    name: 'Input',
    desc: 'Text field with optional label. Supports all native input types.',
    props: [
      { name: 'type', type: 'string', def: "'text'", desc: 'Native input type.' },
      { name: 'placeholder', type: 'string', def: "''", desc: 'Placeholder text.' },
      { name: 'value', type: 'string', def: "''", desc: 'Field value.' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Disable the field.' },
      { name: 'label', type: 'string', def: "''", desc: 'Optional label.' },
    ],
    controls: [
      { key: 'type', label: 'type', type: 'select', options: ['text', 'password', 'number', 'email'], default: 'text' },
      { key: 'label', label: 'label', type: 'text', default: 'Robot ID' },
      { key: 'placeholder', label: 'placeholder', type: 'text', default: 'RBT-21' },
      { key: 'value', label: 'value', type: 'text', default: '' },
      { key: 'disabled', label: 'disabled', type: 'boolean', default: false },
    ],
    customize: `lab21-input {
  --lab21-dark: #111;
  --lab21-border: #444;
}`,
    preview: (v, _on) => (
      <Lab21Input type={v.type} label={v.label} placeholder={v.placeholder} value={v.value} disabled={v.disabled} />
    ),
  },
  {
    tag: 'lab21-switch',
    reactTag: 'Lab21Switch',
    name: 'Switch',
    desc: 'On/off toggle. Emits lab21Change with the new boolean state.',
    props: [
      { name: 'checked', type: 'boolean', def: 'false', desc: 'Toggle state.' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Disable interaction.' },
      { name: 'label', type: 'string', def: "''", desc: 'Optional text.' },
    ],
    events: ['lab21Change — (detail: boolean)'],
    controls: [
      { key: 'checked', label: 'checked', type: 'boolean', default: false },
      { key: 'disabled', label: 'disabled', type: 'boolean', default: false },
      { key: 'label', label: 'label', type: 'text', default: 'Power' },
    ],
    customize: `lab21-switch {
  --lab21-accent: #2ecc71;
}`,
    preview: (v, on) => <Lab21Switch checked={v.checked} disabled={v.disabled} label={v.label} onLab21Change={on} />,
  },
  {
    tag: 'lab21-checkbox',
    reactTag: 'Lab21Checkbox',
    name: 'Checkbox',
    desc: 'Boolean selection with label. Emits lab21Change.',
    props: [
      { name: 'checked', type: 'boolean', def: 'false', desc: 'Checked state.' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Disable interaction.' },
      { name: 'label', type: 'string', def: "''", desc: 'Label text.' },
    ],
    events: ['lab21Change — (detail: boolean)'],
    controls: [
      { key: 'checked', label: 'checked', type: 'boolean', default: true },
      { key: 'disabled', label: 'disabled', type: 'boolean', default: false },
      { key: 'label', label: 'label', type: 'text', default: 'Auto-pilot' },
    ],
    customize: `lab21-checkbox {
  --lab21-accent: #ff6b00;
}`,
    preview: (v, on) => <Lab21Checkbox checked={v.checked} disabled={v.disabled} label={v.label} onLab21Change={on} />,
  },
  {
    tag: 'lab21-radio-group',
    reactTag: 'Lab21RadioGroup',
    name: 'Radio Group',
    desc: 'Single-choice selection from a list. Emits lab21Change with the selected value.',
    props: [
      { name: 'value', type: 'string', def: "''", desc: 'Selected value.' },
      { name: 'name', type: 'string', def: "'lab21-radio'", desc: 'Group name.' },
      { name: 'options', type: 'string[] | string', def: '[]', desc: 'Available options.' },
      { name: 'fieldLabel', type: 'string', def: "''", desc: 'Optional group label.' },
    ],
    events: ['lab21Change — (detail: string)'],
    controls: [
      { key: 'options', label: 'options (comma)', type: 'text', isArray: true, default: 'Manual,Auto' },
      { key: 'value', label: 'value', type: 'text', default: 'Auto' },
      { key: 'fieldLabel', label: 'fieldLabel', type: 'text', default: 'Mode' },
      { key: 'name', label: 'name', type: 'text', default: 'lab21-radio' },
    ],
    customize: `lab21-radio-group {
  --lab21-accent: #ff6b00;
}`,
    preview: (v, on) => (
      <Lab21RadioGroup
        options={String(v.options).split(',').map((s) => s.trim()).filter(Boolean)}
        value={v.value}
        fieldLabel={v.fieldLabel}
        name={v.name}
        onLab21Change={on}
      />
    ),
  },
  {
    tag: 'lab21-slider',
    reactTag: 'Lab21Slider',
    name: 'Slider',
    desc: 'Range value picker. Emits lab21Change with the numeric value.',
    props: [
      { name: 'value', type: 'number', def: '0', desc: 'Current value.' },
      { name: 'min', type: 'number', def: '0', desc: 'Minimum.' },
      { name: 'max', type: 'number', def: '100', desc: 'Maximum.' },
      { name: 'step', type: 'number', def: '1', desc: 'Step increment.' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Disable interaction.' },
    ],
    events: ['lab21Change — (detail: number)'],
    controls: [
      { key: 'value', label: 'value', type: 'number', default: 60 },
      { key: 'min', label: 'min', type: 'number', default: 0 },
      { key: 'max', label: 'max', type: 'number', default: 100 },
      { key: 'step', label: 'step', type: 'number', default: 1 },
      { key: 'disabled', label: 'disabled', type: 'boolean', default: false },
    ],
    customize: `lab21-slider {
  --lab21-accent: #ff6b00;
  --lab21-border: #444;
}`,
    preview: (v, on) => (
      <Lab21Slider value={v.value} min={v.min} max={v.max} step={v.step} disabled={v.disabled} onLab21Change={on} />
    ),
  },
  {
    tag: 'lab21-select',
    reactTag: 'Lab21Select',
    name: 'Select',
    desc: 'Dropdown selection. Emits lab21Change with the selected value.',
    props: [
      { name: 'value', type: 'string', def: "''", desc: 'Selected value.' },
      { name: 'options', type: 'string[] | string', def: '[]', desc: 'Available options.' },
      { name: 'placeholder', type: 'string', def: "'Select...'", desc: 'Placeholder text.' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Disable interaction.' },
      { name: 'fieldLabel', type: 'string', def: "''", desc: 'Optional label.' },
    ],
    events: ['lab21Change — (detail: string)'],
    controls: [
      { key: 'options', label: 'options (comma)', type: 'text', isArray: true, default: 'Nav,Lidar,Power' },
      { key: 'value', label: 'value', type: 'text', default: 'Nav' },
      { key: 'placeholder', label: 'placeholder', type: 'text', default: 'Select...' },
      { key: 'fieldLabel', label: 'fieldLabel', type: 'text', default: 'Module' },
      { key: 'disabled', label: 'disabled', type: 'boolean', default: false },
    ],
    customize: `lab21-select {
  --lab21-dark: #111;
  --lab21-border: #444;
}`,
    preview: (v, on) => (
      <Lab21Select
        options={String(v.options).split(',').map((s) => s.trim()).filter(Boolean)}
        value={v.value}
        placeholder={v.placeholder}
        fieldLabel={v.fieldLabel}
        disabled={v.disabled}
        onLab21Change={on}
      />
    ),
  },
  {
    tag: 'lab21-progress',
    reactTag: 'Lab21Progress',
    name: 'Progress',
    desc: 'Linear progress bar. Pass value and max (0–100%).',
    props: [
      { name: 'value', type: 'number', def: '0', desc: 'Current value.' },
      { name: 'max', type: 'number', def: '100', desc: 'Maximum value.' },
    ],
    controls: [
      { key: 'value', label: 'value', type: 'number', default: 66 },
      { key: 'max', label: 'max', type: 'number', default: 100 },
    ],
    customize: `lab21-progress {
  --lab21-accent: #ff6b00;
  --lab21-border: #444;
}`,
    preview: (v, _on) => <Lab21Progress value={v.value} max={v.max} />,
  },
  {
    tag: 'lab21-tabs',
    reactTag: 'Lab21Tabs',
    name: 'Tabs',
    desc: 'Tabbed content switcher. Use slot="tab" for triggers and data-panel for panels. Emits lab21Change.',
    props: [
      { name: 'defaultValue', type: 'string', def: "''", desc: 'Initially active tab.' },
      { name: 'value', type: 'string', def: "''", desc: 'Controlled active tab.' },
    ],
    events: ['lab21Change — (detail: string)'],
    controls: [{ key: 'defaultValue', label: 'defaultValue', type: 'text', default: 'a' }],
    customize: `lab21-tabs {
  --lab21-border: #444;
  --lab21-surface: #333;
}`,
    preview: (v, on) => (
      <Lab21Tabs defaultValue={v.defaultValue} onLab21Change={on}>
        <button slot="tab" data-value="a">Tab A</button>
        <button slot="tab" data-value="b">Tab B</button>
        <div data-panel="a" className="pt-3 text-sm text-lab-light">Content A</div>
        <div data-panel="b" className="pt-3 text-sm text-lab-light">Content B</div>
      </Lab21Tabs>
    ),
  },
  {
    tag: 'lab21-dialog',
    reactTag: 'Lab21Dialog',
    name: 'Dialog',
    desc: 'Modal overlay. Control with the open prop; closes via the lab21Close event.',
    props: [
      { name: 'open', type: 'boolean', def: 'false', desc: 'Show/hide the dialog.' },
      { name: 'heading', type: 'string', def: "''", desc: 'Dialog title.' },
    ],
    events: ['lab21Close — (no detail)'],
    controls: [
      { key: 'open', label: 'open', type: 'boolean', default: false },
      { key: 'heading', label: 'heading', type: 'text', default: 'Confirm' },
    ],
    customize: `lab21-dialog {
  --lab21-surface: #2a2a2a;
  --lab21-border: #555;
}`,
    preview: (v, on) => (
      <Lab21Dialog open={v.open} heading={v.heading} onLab21Close={on}>
        <p className="text-sm text-lab-light">Are you sure?</p>
      </Lab21Dialog>
    ),
  },
];

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-sm border border-lab-border bg-[#1f1f1f] p-3 font-mono text-xs leading-6 text-lab-light">
      <code>{children}</code>
    </pre>
  );
}

function PropTable({ props }: { props: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-lab-border">
      <table className="w-full text-left text-xs">
        <thead className="bg-lab-dark font-mono text-lab-gray">
          <tr>
            <th className="p-2">Prop</th>
            <th className="p-2">Type</th>
            <th className="p-2">Default</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {props.map((p) => (
            <tr key={p.name} className="border-t border-lab-border">
              <td className="p-2 text-lab-orange">{p.name}</td>
              <td className="p-2 text-lab-light">{p.type}</td>
              <td className="p-2 text-lab-gray">{p.def ?? '—'}</td>
              <td className="p-2 text-lab-gray">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ControlInput({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: any;
  onChange: (v: any) => void;
}) {
  if (control.type === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-xs text-lab-light">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="accent-lab-orange" />
        {control.label}
      </label>
    );
  }
  if (control.type === 'select') {
    return (
      <label className="flex flex-col gap-1 text-xs text-lab-gray">
        {control.label}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-sm border border-lab-border bg-lab-dark px-2 py-1 font-mono text-lab-light"
        >
          {control.options!.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <label className="flex flex-col gap-1 text-xs text-lab-gray">
      {control.label}
      <input
        type={control.type === 'number' ? 'number' : 'text'}
        value={value}
        onChange={(e) => onChange(control.type === 'number' ? Number(e.target.value) : e.target.value)}
        className="rounded-sm border border-lab-border bg-lab-dark px-2 py-1 font-mono text-lab-light"
      />
    </label>
  );
}

/* ---------- live interactive block ---------- */

function Live({ entry }: { entry: DocEntry }) {
  const [values, setValues] = useState<Record<string, any>>(() =>
    Object.fromEntries(entry.controls.map((c) => [c.key, c.default]))
  );
  const [flavor, setFlavor] = useState<'html' | 'react' | 'vue'>('html');
  const [eventDetail, setEventDetail] = useState<string>('—');

  const update = (key: string, val: any) => setValues((v) => ({ ...v, [key]: val }));
  const onEvent = (e: any) => setEventDetail(e?.detail === undefined ? 'void' : JSON.stringify(e.detail));

  const flavors = [
    { id: 'html', label: 'HTML' },
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
  ] as const;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* live preview + controls */}
      <div className="space-y-4">
        <div className="flex min-h-[120px] items-center justify-center rounded-sm border border-lab-border bg-[#1f1f1f] p-6">
          {entry.preview(values, onEvent)}
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-sm border border-lab-border bg-lab-dark p-4 sm:grid-cols-3">
          {entry.controls.map((c) => (
            <ControlInput key={c.key} control={c} value={values[c.key]} onChange={(v) => update(c.key, v)} />
          ))}
        </div>
        {entry.events && (
          <p className="font-mono text-xs text-lab-gray">
            last event detail: <span className="text-lab-orange">{eventDetail}</span>
          </p>
        )}
      </div>

      {/* live code */}
      <div className="space-y-2">
        <div className="flex gap-2 border-b border-lab-border">
          {flavors.map((f) => (
            <button
              key={f.id}
              onClick={() => setFlavor(f.id)}
              className={`px-3 py-1 font-display text-xs uppercase tracking-wide ${
                flavor === f.id ? 'bg-lab-surface text-white' : 'text-lab-gray hover:text-lab-light'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Code>{genCode(entry, values, flavor)}</Code>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function Docs() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#4e4e4e_0%,#2b2b2b_42%,#1b1b1b_100%)] px-4 py-8 text-lab-light selection:bg-lab-orange selection:text-white md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="border-b border-lab-border pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-lab-gray">Documentation</p>
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white">Components</h1>
          <p className="mt-2 max-w-2xl text-sm text-lab-gray">
            Every component is a native custom element. Change the controls below to see the component update live — the
            code regenerates instantly for HTML, React, and Vue.
          </p>
        </header>

        <div className="flex flex-col gap-12">
          {DOCS.map((doc) => (
            <Lab21Card key={doc.tag}>
              <div className="space-y-5 p-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-2xl font-bold text-white">{doc.name}</h2>
                  <code className="font-mono text-xs text-lab-orange">{doc.tag}</code>
                </div>
                <p className="text-sm leading-6 text-lab-gray">{doc.desc}</p>

                <Live entry={doc} />

                <div>
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-lab-gray">Props</h3>
                  <PropTable props={doc.props} />
                </div>

                {doc.events && (
                  <div>
                    <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-lab-gray">Events</h3>
                    <ul className="list-inside list-disc font-mono text-xs text-lab-light">
                      {doc.events.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-lab-gray">Customization</h3>
                  <Code>{doc.customize}</Code>
                </div>
              </div>
            </Lab21Card>
          ))}
        </div>

        <section className="space-y-4 border-t border-lab-border pt-8">
          <h2 className="font-display text-2xl font-bold text-white">Global theming</h2>
          <p className="text-sm text-lab-gray">
            All components read these CSS variables. Set them on <code className="text-lab-orange">:root</code> or any
            parent element to re-skin the whole kit.
          </p>
          <Code>{`:root {
  --lab21-accent: #ff6b00;
  --lab21-surface: #4a4a4a;
  --lab21-dark: #2a2a2a;
  --lab21-border: #636363;
  --lab21-foreground: #f5f5f5;
  --lab21-gray: #a3a3a3;
}`}</Code>
        </section>

        <footer className="border-t border-lab-border pt-6 text-center font-mono text-xs text-lab-gray">
          Lab21 UI Kit — Web Components for humans and microcontrollers.
        </footer>
      </div>
    </main>
  );
}
