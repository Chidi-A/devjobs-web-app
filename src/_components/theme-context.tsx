'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for hydration to complete
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // First toggle always goes from system to the opposite of current resolved theme
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      // Subsequent toggles just switch between light and dark
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  // Return safe values during SSR
  if (!mounted) {
    return {
      theme: 'light', // Safe default during SSR
      toggleTheme: () => {},
      setTheme: () => {},
      mounted: false,
    };
  }

  return {
    theme: resolvedTheme, // Use resolvedTheme for consistency
    toggleTheme,
    setTheme,
    mounted: true,
  };
}
