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
          <HoverCardTrigger
            href="https://www.linkedin.com/in/dimmasyusuf/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:font-bold cursor-pointer transition-all ease-in-out duration-3000"
          >
            dimmasyusuf
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-2">
              <div className="relative flex items-center justify-center aspect-square h-10 w-10">
                <Image
                  src="/images/profile.webp"
                  alt="dimmasyusuf"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col overflow-hidden w-full">
                  <span className="font-bold truncate text-sm">
                    Dimas Yusuf Qurohman
                  </span>
                  <span className="truncate">Software Engineer</span>
                </div>

                <div className="flex gap-2 items-center">
                  <Link
                    href="https://github.com/dimmasyusuf/"
                    className="flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubLogoIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/dimmasyusuf/"
                    className="flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInLogoIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/dimmasyusuf/"
                    className="flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramLogoIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://discordapp.com/users/461403866299236352/"
                    className="flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
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
