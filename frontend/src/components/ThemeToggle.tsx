"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-background border border-border hover:bg-accent transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon className="h-4 w-4 text-foreground" />
      ) : (
        <FiSun className="h-4 w-4 text-foreground" />
      )}
    </button>
  );
}
