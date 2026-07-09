// Custom type declarations for native Web Components used in the demo app.
import type * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'lab21-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { variant?: string; size?: string; disabled?: boolean };
      'lab21-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { elevation?: string };
    }
  }
}


