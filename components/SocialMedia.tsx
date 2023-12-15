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
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-lg">Follow Me</h3>
      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          asChild
        >
          <Link href="https://github.com/dimmasyusuf/">
            <GitHubLogoIcon className="h-6 w-6" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          asChild
        >
          <Link href="https://www.linkedin.com/in/dimmasyusuf/">
            <LinkedInLogoIcon className="h-6 w-6" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          asChild
        >
          <Link href="https://www.instagram.com/dimmasyusuf/">
            <InstagramLogoIcon className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
