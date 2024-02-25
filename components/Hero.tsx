import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  RiCheckboxBlankCircleFill,
  RiMapPinLine,
  RiVerifiedBadgeFill,
} from 'react-icons/ri';
import { Separator } from './ui/separator';
import { EnvelopeClosedIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 border-y sm:border rounded-none sm:rounded-md">
      <div className="hero-bg flex flex-col gap-4 h-32 sm:h-48 w-full rounded-none sm:rounded-t-md" />

      <div className="flex flex-col gap-4 bg-background rounded-none sm:rounded-md p-4 sm:p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center justify-center mt-[-80px] sm:mt-[-96px]">
            <Image
              src="/images/profile.webp"
              alt="Profile Image"
              width={144}
              height={144}
              className="w-28 h-28 sm:w-36 sm:h-36 shape border-primary border-2"
              priority={true}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              asChild
              className="shadow-none h-8 w-8"
            >
              <Link
                href="mailto:dimasyusufqurohman@gmail.com"
                aria-label="Send me an email"
              >
                <EnvelopeClosedIcon className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="icon"
              variant="outline"
              asChild
              className="shadow-none h-8 w-8"
            >
              <Link
                href="https://github.com/dimmasyusuf/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow me on GitHub"
              >
                <GitHubLogoIcon className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="sm"
              asChild
            >
              <Link
                href="https://www.linkedin.com/in/dimmasyusuf/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hire Me
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="flex gap-2 items-center text-lg sm:text-2xl font-bold">
            Dimas Yusuf Qurohman
            <RiVerifiedBadgeFill className="w-4 h-4 text-sky-500" />
          </h1>
          <p className="sm:text-lg">Software Engineer</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <RiMapPinLine className="w-4 h-4" />
            <span className="text-xs">Cilacap, Indonesia</span>
          </div>

          <Separator
            orientation="vertical"
            className="h-4"
          />

          <Link
            href="https://www.linkedin.com/in/dimmasyusuf/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative"
          >
            <span className="absolute flex items-center justify-center top-[-3px] right-[-3px]">
              <RiCheckboxBlankCircleFill className="w-3 h-3 text-green-500" />
              <RiCheckboxBlankCircleFill className="absolute w-3 h-3 text-green-400 animate-ping opacity-75" />
            </span>

            <span className="flex items-center text-xs h-8 px-3 border rounded-md bg-transparent cursor-pointer hover:bg-accent hover:text-accent-foreground">
              Available for work
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
