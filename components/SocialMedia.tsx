import Link from 'next/link';
import { Button } from './ui/button';
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import ThemeToggle from './ThemeToggle';

export default function SocialMedia() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 hover:bg-background dark:hover:bg-accent"
        aria-label="Follow me on GitHub"
        asChild
      >
        <Link
          href="https://github.com/dimmasyusuf/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon className="h-6 w-6" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 hover:bg-background dark:hover:bg-accent"
        aria-label="Follow me on LinkedIn"
        asChild
      >
        <Link
          href="https://www.linkedin.com/in/dimmasyusuf/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInLogoIcon className="h-6 w-6" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 hover:bg-background dark:hover:bg-accent"
        aria-label="Follow me on Instagram"
        asChild
      >
        <Link
          href="https://www.instagram.com/dimmasyusuf/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramLogoIcon className="h-6 w-6" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 hover:bg-background dark:hover:bg-accent"
        aria-label="Follow me on Discord"
        asChild
      >
        <Link
          href="https://discordapp.com/users/461403866299236352/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordLogoIcon className="h-6 w-6" />
        </Link>
      </Button>

      <ThemeToggle />
    </div>
  );
}
