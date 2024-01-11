import Link from 'next/link';
import { Button } from './ui/button';
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';

export default function SocialMedia() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        aria-label="Follow me on GitHub"
        asChild
      >
        <Link
          href="https://github.com/dimmasyusuf/"
          target="_blank"
        >
          <GitHubLogoIcon className="h-6 w-6" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        aria-label="Follow me on LinkedIn"
        asChild
      >
        <Link
          href="https://www.linkedin.com/in/dimmasyusuf/"
          target="_blank"
        >
          <LinkedInLogoIcon className="h-6 w-6" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        aria-label="Follow me on Instagram"
        asChild
      >
        <Link
          href="https://www.instagram.com/dimmasyusuf/"
          target="_blank"
        >
          <InstagramLogoIcon className="h-6 w-6" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        aria-label="Follow me on Discord"
        asChild
      >
        <Link
          href="https://discordapp.com/users/461403866299236352/"
          target="_blank"
        >
          <DiscordLogoIcon className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
}
