import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center cursor-default border px-2 py-1 text-xs', {
  variants: {
    variant: {
      default: 'bg-primary hover:bg-primary/80 border-transparent text-primary-foreground',
      secondary: 'bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground',
      green: 'bg-green-500/60 border-transparent text-secondary-foreground',
      red: 'bg-red-500/60 border-transparent text-secondary-foreground',
      destructive: 'bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground',
      warning: 'bg-yellow-300 hover:bg-yellow-300/80 border-transparent text-yellow-300-foreground',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
