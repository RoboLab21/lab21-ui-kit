# Lab21 UI Kit

Web Components-first UI kit for the web **and** microcontrollers. One Stencil
source compiles to native `<lab21-*>` custom elements, with React and Vue
wrappers generated automatically.

## Packages

| Package | Purpose |
|---------|---------|
| `@lab21/core` | Stencil source of truth → native custom elements |
| `@lab21/react` | React wrappers (auto-generated) |
| `@lab21/vue` | Vue wrappers (auto-generated) |

## Install

```bash
npm install @lab21/core @lab21/react   # React
npm install @lab21/core @lab21/vue     # Vue
```

## Usage

### Plain HTML / ESP32

```html
<script type="module"
  src="https://cdn.jsdelivr.net/npm/@lab21/core/dist/lab21/lab21.esm.js"></script>

<lab21-button variant="default">Save</lab21-button>
```

No framework, no bundle — perfect for SPIFFS/LittleFS/PROGMEM on ESP32/ESP8266.

### React

```tsx
import { Lab21Button, Lab21Card } from '@lab21/react';
import '@lab21/core';

export function App() {
  return (
    <Lab21Card elevation="raised">
      <Lab21Button variant="default">Save</Lab21Button>
    </Lab21Card>
  );
}
```

### Vue

```vue
<script setup>
import { Lab21Button, Lab21Card } from '@lab21/vue';
import '@lab21/core';
</script>

<template>
  <Lab21Card elevation="raised">
    <Lab21Button variant="default">Save</Lab21Button>
  </Lab21Card>
</template>
```

## Components

`lab21-button`, `lab21-card`, `lab21-badge`, `lab21-input`, `lab21-switch`,
`lab21-checkbox`, `lab21-radio-group`, `lab21-slider`, `lab21-select`,
`lab21-progress`, `lab21-tabs`, `lab21-dialog`.

## Development

```bash
npm install
npm run dev          # builds core + wrappers, then starts Vite demo
npm run build        # production build of the demo (GitHub Pages source)
npm run build:core   # build @lab21/core
npm run build:wrappers # build @lab21/react and @lab21/vue
```

## Starter templates

See templates for copy-paste starters: `html-esp32`,
`react-app`, `vue-app`.

## CI/CD

- `.github/workflows/ci.yml` — builds, lints, and deploys the demo to GitHub Pages.
- `.github/workflows/release.yml` — publishes all three packages to npm on tag push.
