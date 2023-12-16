import Image from 'next/image';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <div className="order-2 md:order-1 flex items-center justify-center">
        <div className="flex flex-col gap-4 sm:gap-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center md:text-start">
            dimmasyusuf
          </h2>
          <p className="text-md md:text-lg text-center md:text-start">
            A Full Stack Developer from Indonesia.
            <br /> Currently freelancing at UpWork.
          </p>
          <div className="flex gap-4 items-center justify-center md:justify-start">
            <Button
              size="lg"
              asChild
            >
              <Link href="https://www.linkedin.com/in/dimmasyusuf/">
                Hire Me
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              asChild
            >
              <Link href="https://github.com/dimmasyusuf/">
                <GitHubLogoIcon className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center order-1 md:order-2">
        <Image
          src="/profile.webp"
          alt="dimmasyusuf Profile Image"
          width="350"
          height="350"
          className="shape border-black dark:border-white border-[3px]"
          priority={true}
        />
      </div>
    </div>
  );
}
