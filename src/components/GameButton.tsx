import React from 'react';
import { cn } from '@/lib/utils';

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: 'cyan' | 'purple' | 'green';
  children: React.ReactNode;
}

const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = 'primary', size = 'md', glowColor = 'cyan', children, ...props }, ref) => {
    const baseClasses = "font-orbitron font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl border-2 relative overflow-hidden group";
    
    const variants = {
      primary: `
        bg-gradient-to-r from-neon-cyan to-neon-blue text-background 
        border-neon-cyan hover:border-neon-blue
        shadow-glow-cyan hover:shadow-[0_0_30px_hsl(180_100%_50%/0.6)]
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
      `,
      secondary: `
        bg-gradient-to-r from-neon-purple to-neon-pink text-background
        border-neon-purple hover:border-neon-pink
        shadow-glow-purple hover:shadow-[0_0_30px_hsl(270_100%_70%/0.6)]
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
      `,
      success: `
        bg-gradient-to-r from-neon-green to-emerald-400 text-background
        border-neon-green hover:border-emerald-400
        shadow-glow-green hover:shadow-[0_0_30px_hsl(120_100%_50%/0.6)]
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
      `,
      glow: `
        bg-transparent text-neon-${glowColor} border-neon-${glowColor}
        hover:bg-neon-${glowColor}/10 hover:text-foreground
        shadow-glow-${glowColor} hover:shadow-[0_0_40px_hsl(180_100%_50%/0.8)]
      `
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

GameButton.displayName = "GameButton";

export default GameButton;