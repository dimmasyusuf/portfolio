import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function Copyright() {
  const year = new Date().getFullYear() as number;

  return (
    <div className="flex justify-center items-center p-4">
      <p className="text-xs text-muted-foreground">
        &copy; {year}{' '}
        <HoverCard>
          <HoverCardTrigger className="hover:text-primary hover:font-bold hover:underline cursor-pointer">
            dimmasyusuf
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-2">
              <div className="relative flex items-center justify-center aspect-square h-10 w-10">
                <Image
                  src="/profile.webp"
                  alt="dimmasyusuf"
                  fill
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col overflow-hidden w-full">
                  <h2 className="font-bold truncate text-sm">
                    Dimas Yusuf Qurohman
                  </h2>
                  <p className="truncate">Full Stack Developer</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Link
                    href="https://github.com/dimmasyusuf/"
                    className="flex items-center justify-center"
                    target="_blank"
                  >
                    <GitHubLogoIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/dimmasyusuf/"
                    className="flex items-center justify-center"
                    target="_blank"
                  >
                    <LinkedInLogoIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/dimmasyusuf/"
                    className="flex items-center justify-center"
                    target="_blank"
                  >
                    <InstagramLogoIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://discordapp.com/users/461403866299236352/"
                    className="flex items-center justify-center"
                    target="_blank"
                  >
                    <DiscordLogoIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        . All rights reserved.
      </p>
    </div>
  );
}
