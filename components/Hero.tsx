import Image from 'next/image';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <div className="order-2 sm:order-1 flex items-center justify-center">
        <div className="flex flex-col">
          <h2 className="text-4xl font-extrabold text-center sm:text-start mb-2">
            dimmasyusuf
          </h2>
          <p className=" text-center sm:text-start mb-6">
            A Full Stack Developer from Indonesia.
            <br /> Currently freelancing at UpWork.
          </p>
          <div className="flex gap-4 items-center justify-center sm:justify-start">
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
      <div className="flex justify-center order-1 sm:order-2">
        <Image
          src="/profile.webp"
          alt="dimmasyusuf Profile Image"
          width="256"
          height="256"
          className="shape border-black dark:border-white border-[3px]"
          priority={true}
        />
      </div>
    </div>
  );
}
