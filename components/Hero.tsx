'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  RiChat3Fill,
  RiChat3Line,
  RiHeart3Fill,
  RiHeart3Line,
  RiMapPinLine,
} from 'react-icons/ri';
import { Separator } from './ui/separator';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Hero() {
  const [guestbookHover, setGuestbookHover] = useState(false);
  const [supportHover, setSupportHover] = useState(false);

  return (
    <section className="grid grid-cols-1 border rounded-md">
      <div className="hero-bg flex flex-col gap-4 h-32 sm:h-48 w-full rounded-t-md"></div>
      <div className="flex flex-col gap-4 bg-background rounded-b-md p-6">
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
              aria-label="Contact me"
              onMouseOver={() => setGuestbookHover(true)}
              onMouseLeave={() => setGuestbookHover(false)}
              className="shadow-none h-8 w-8"
            >
              <Link href="/guestbook">
                {guestbookHover ? (
                  <RiChat3Fill className="w-4 h-4" />
                ) : (
                  <RiChat3Line className="w-4 h-4" />
                )}
              </Link>
            </Button>
            <Button
              size="icon"
              variant="outline"
              asChild
              aria-label="Support me"
              onMouseOver={() => setSupportHover(true)}
              onMouseLeave={() => setSupportHover(false)}
              className="shadow-none h-8 w-8"
            >
              <Link href="/support">
                {supportHover ? (
                  <RiHeart3Fill className="w-4 h-4" />
                ) : (
                  <RiHeart3Line className="w-4 h-4" />
                )}
              </Link>
            </Button>
            <Button
              size="sm"
              asChild
            >
              <Link href="/support">Hire Me</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-lg sm:text-2xl font-bold">
            Dimas Yusuf Qurohman
          </h1>
          <p className="text-md sm:text-lg">Software Engineer</p>
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
            href="https://github.com/dimmasyusuf/"
            aria-label="GitHub Profile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <GitHubLogoIcon className="w-4 h-4" />
            <span className="text-xs hover:underline">@dimmasyusuf</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
