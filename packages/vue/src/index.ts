export * from './components/index';

export interface Lab21VueComponentProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const LAB21_COMPONENTS = ['lab21-button', 'lab21-card'];