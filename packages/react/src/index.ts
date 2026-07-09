export * from './components/components';

export type Lab21ButtonVariant = 'default' | 'outline' | 'ghost';
export type Lab21ButtonSize = 'sm' | 'md' | 'lg';

export interface Lab21ButtonProps {
  variant?: Lab21ButtonVariant;
  size?: Lab21ButtonSize;
  disabled?: boolean;
  children?: unknown;
}

export const LAB21_COMPONENTS = ['lab21-button', 'lab21-card'];