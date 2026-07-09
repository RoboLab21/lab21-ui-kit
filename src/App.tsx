import { useEffect, useState } from 'react';
import { Lab21Button, Lab21Card, Lab21Badge, Lab21Input, Lab21Switch, Lab21Slider, Lab21Progress, Lab21Checkbox, Lab21Select, Lab21RadioGroup } from '@lab21/react';
import './types';
import Docs from './Docs';

const installCommands = [
  'npm install @lab21/core',
  'npm install @lab21/react',
  'npm install @lab21/vue',
];

const usageTabs = [
  {
    id: 'html',
    label: 'HTML / ESP32',
    code: `<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@lab21/core/dist/lab21/lab21.esm.js';
</script>

<lab21-button variant="default">Save</lab21-button>
<lab21-card elevation="raised">
  <lab21-input label="Robot ID" placeholder="RBT-21"></lab21-input>
</lab21-card>`,
  },
  {
    id: 'react',
    label: 'React',
    code: `import { Lab21Button, Lab21Card } from '@lab21/react';
import '@lab21/core';

export function App() {
  return (
    <Lab21Card elevation="raised">
      <Lab21Button variant="default">Save</Lab21Button>
    </Lab21Card>
  );
}`,
  },
  {
    id: 'vue',
    label: 'Vue',
    code: `import { Lab21Button, Lab21Card } from '@lab21/vue';
import '@lab21/core';

<template>
  <Lab21Card elevation="raised">
    <Lab21Button variant="default">Save</Lab21Button>
  </Lab21Card>
</template>`,
  },
];

const components = [
  { tag: 'lab21-button', name: 'Button', desc: 'Primary action trigger with variants.' },
  { tag: 'lab21-card', name: 'Card', desc: 'Container surface with chamfered corners.' },
  { tag: 'lab21-badge', name: 'Badge', desc: 'Compact status indicator.' },
  { tag: 'lab21-input', name: 'Input', desc: 'Text field with label.' },
  { tag: 'lab21-switch', name: 'Switch', desc: 'Toggle with on/off state.' },
  { tag: 'lab21-checkbox', name: 'Checkbox', desc: 'Boolean selection.' },
  { tag: 'lab21-radio-group', name: 'Radio Group', desc: 'Single choice from options.' },
  { tag: 'lab21-slider', name: 'Slider', desc: 'Range value picker.' },
  { tag: 'lab21-select', name: 'Select', desc: 'Dropdown selection.' },
  { tag: 'lab21-progress', name: 'Progress', desc: 'Linear progress bar.' },
  { tag: 'lab21-tabs', name: 'Tabs', desc: 'Tabbed content switcher.' },
  { tag: 'lab21-dialog', name: 'Dialog', desc: 'Modal overlay.' },
];

export default function App() {
  const [view, setView] = useState<'overview' | 'docs'>('overview');
  const [activeTab, setActiveTab] = useState('html');
  const [progress, setProgress] = useState(42);
  const [switchOn, setSwitchOn] = useState(true);
  const [slider, setSlider] = useState(60);

  useEffect(() => {
    document.documentElement.style.setProperty('--lab21-accent', '#ff6b00');
  }, []);

  const activeCode = usageTabs.find((t) => t.id === activeTab)?.code ?? '';

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#4e4e4e_0%,#2b2b2b_42%,#1b1b1b_100%)] px-4 py-8 text-lab-light selection:bg-lab-orange selection:text-white md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        {/* Hero */}
        <header className="flex flex-col gap-6 border-b border-lab-border pb-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center chamfer-brand border border-lab-orange bg-lab-dark shadow-lg">
              <span className="font-display text-2xl font-bold tracking-tight text-lab-orange">L21</span>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-lab-gray">Lab21 UI Kit</p>
              <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                Web Components first
              </h1>
            </div>
          </div>
          <p className="max-w-3xl text-base leading-7 text-lab-gray md:text-lg">
            One component source, three ways to use it. Native HTML custom elements for ESP32 and plain
            web pages, plus React and Vue wrappers generated automatically from the same Stencil core.
          </p>
          <div className="flex flex-wrap gap-3">
            <Lab21Badge variant="outline">core / react / vue</Lab21Badge>
            <Lab21Badge>ESP32 ready</Lab21Badge>
            <Lab21Badge variant="secondary">12 components</Lab21Badge>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('overview')}
              className={`px-4 py-2 font-display text-sm uppercase tracking-wide chamfer-brand border ${
                view === 'overview' ? 'border-lab-orange bg-lab-surface text-white' : 'border-lab-border text-lab-gray hover:text-lab-light'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setView('docs')}
              className={`px-4 py-2 font-display text-sm uppercase tracking-wide chamfer-brand border ${
                view === 'docs' ? 'border-lab-orange bg-lab-surface text-white' : 'border-lab-border text-lab-gray hover:text-lab-light'
              }`}
            >
              Docs
            </button>
          </div>
        </header>

        {view === 'docs' ? (
          <Docs />
        ) : (
        <>

        {/* Install */}
        <section className="grid gap-6 lg:grid-cols-2">
          <Lab21Card elevation="raised">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">Install</h2>
              <p className="text-sm text-lab-gray">Pick the package for your stack. All share the same markup.</p>
              <div className="grid gap-2 rounded-sm border border-lab-border bg-lab-dark p-4 font-mono text-sm text-lab-light">
                {installCommands.map((cmd) => (
                  <div key={cmd} className="flex items-center gap-3">
                    <span className="text-lab-orange">&gt;</span>
                    <span>{cmd}</span>
                  </div>
                ))}
              </div>
            </div>
          </Lab21Card>

          <Lab21Card>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">How it works</h2>
              <ul className="space-y-3 text-sm leading-6 text-lab-gray">
                <li><strong className="text-white">@lab21/core</strong> — Stencil compiles to native &lt;lab21-*&gt; custom elements.</li>
                <li><strong className="text-white">@lab21/react</strong> — typed wrappers, no duplicated logic.</li>
                <li><strong className="text-white">@lab21/vue</strong> — Vue wrappers on the same core.</li>
                <li><strong className="text-white">ESP32</strong> — use core output as plain HTML/CSS, no framework bundle.</li>
              </ul>
            </div>
          </Lab21Card>
        </section>

        {/* Usage tabs */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-white">Quick start</h2>
          <div className="flex gap-2 border-b border-lab-border">
            {usageTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-display text-sm uppercase tracking-wide ${
                  activeTab === tab.id ? 'bg-lab-surface text-white' : 'text-lab-gray hover:text-lab-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <pre className="overflow-x-auto rounded-sm border border-lab-border bg-[#1f1f1f] p-4 font-mono text-xs leading-6 text-lab-light">
            <code>{activeCode}</code>
          </pre>
        </section>

        {/* Live playground */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-white">Live playground</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Lab21Card>
              <div className="space-y-5">
                <Lab21Input label="Robot ID" placeholder="RBT-21" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-lab-light">System enabled</span>
                  <Lab21Switch checked={switchOn} onLab21Change={(e: CustomEvent) => setSwitchOn(e.detail)} />
                </div>
                <Lab21Checkbox label="Auto-pilot" checked />
                <Lab21Select fieldLabel="Module" options='["Navigation","Lidar","Power"]' value="Navigation" />
              </div>
            </Lab21Card>

            <Lab21Card elevation="raised">
              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-xs font-mono text-lab-gray">
                    <span>Motor speed</span>
                    <span className="text-lab-orange">{slider}%</span>
                  </div>
                  <Lab21Slider value={slider} onLab21Change={(e: CustomEvent) => setSlider(e.detail)} />
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-xs font-mono text-lab-gray">
                    <span>Boot progress</span>
                    <span className="text-lab-orange">{progress}%</span>
                  </div>
                  <Lab21Progress value={progress} max={100} />
                </div>
                <Lab21RadioGroup fieldLabel="Mode" options='["Manual","Auto","Safe"]' value="Auto" />
                <div className="flex flex-wrap gap-3 pt-2">
                  <Lab21Button variant="default">Primary</Lab21Button>
                  <Lab21Button variant="outline">Outline</Lab21Button>
                  <Lab21Button variant="ghost">Ghost</Lab21Button>
                </div>
              </div>
            </Lab21Card>
          </div>
        </section>

        {/* Component catalog */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-white">Component catalog</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => (
              <Lab21Card key={c.tag}>
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-lab-orange">{c.tag}</p>
                  <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                  <p className="text-sm leading-6 text-lab-gray">{c.desc}</p>
                </div>
              </Lab21Card>
            ))}
          </div>
        </section>

        <footer className="border-t border-lab-border pt-6 text-center font-mono text-xs text-lab-gray">
          Lab21 UI Kit — Web Components for humans and microcontrollers.
        </footer>
        </>
        )}
      </div>
    </main>
  );
}
