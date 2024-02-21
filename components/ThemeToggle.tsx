'use client';

import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTimeout(() => {
      theme === 'light' ? setTheme('dark') : setTheme('light');
    }, 200);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Change theme"
      className="h-10 w-10"
    >
      <SunIcon className="w-6 h-6 scale-100 rotate-0 dark:scale-0 dark:rotate-180 transform transition-all duration-200" />
      <MoonIcon className="absolute w-6 h-6 scale-0 rotate-180 dark:scale-100 dark:rotate-0 transform transition-all duration-200" />
    </Button>
  );
}
