"use client";

import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

type SimpleThemeToggleProps = {
  displayText?: boolean;
};

export default function SimpleThemeToggle({ displayText = false }: SimpleThemeToggleProps) {
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
    return <div className="h-4 w-4"></div>; // placeholder
  }

  return (<>
    <button
      onClick={toggleTheme}
      className="inline-flex items-center "
      aria-label="Toggle theme"
    >
      {displayText ? <span className="text-foreground mr-1">Theme</span> : null}
      {isDark ? (
        <FiSun className="h-4 w-4 self-end text-foreground" />
      ) : (
        <FiMoon className="h-4 w-4 self-end text-foreground" />
      )}
    </button>
  </>);
}
