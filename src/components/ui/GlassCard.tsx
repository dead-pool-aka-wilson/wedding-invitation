import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={clsx(
        'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6',
        className
      )}
    >
      {children}
    </div>
  );
}
