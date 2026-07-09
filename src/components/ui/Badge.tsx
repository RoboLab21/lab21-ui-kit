import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './Button';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-lab-orange focus:ring-offset-2 chamfer-brand-sm uppercase tracking-wider font-display',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-lab-orange text-white hover:bg-lab-orange-hover',
        secondary: 'border-transparent bg-lab-surface text-lab-light hover:bg-lab-surface-hover',
        outline: 'text-lab-orange border border-lab-orange',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
