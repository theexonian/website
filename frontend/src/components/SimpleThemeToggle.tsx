"use client";

import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function SimpleThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-[26px] h-[26px]"></div>; // placeholder
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-[6px] rounded-lg bg-background border border-border hover:bg-accent transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiSun className="w-[1.2em] h-[1.2em] text-foreground" />
      ) : (
        <FiMoon className="w-[1.2em] h-[1.2em] text-foreground" />
      )}
    </button>
  );
}
