'use client';

import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={
        theme === 'light' ? () => setTheme('dark') : () => setTheme('light')
      }
      aria-label="Change theme"
      className="h-10 w-10 hover:bg-background dark:hover:bg-accent"
    >
      <SunIcon className="w-6 h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute w-6 h-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
