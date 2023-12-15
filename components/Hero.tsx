import Image from 'next/image';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full p-4">
      <div className="order-2 sm:order-1 flex flex-col gap-4 sm:gap-6 items-center justify-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold">dimmasyusuf</h2>
        <p className="text-lg text-center">
          A Full Stack Developer from Indonesia.
          <br /> Currently freelancing at UpWork.
        </p>
        <div className="flex gap-4 items-center">
          <Button
            size="lg"
            asChild
          >
            <Link href="https://www.linkedin.com/in/dimmasyusuf/">Hire Me</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="https://github.com/dimmasyusuf/">
              <GitHubLogoIcon className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center order-1 sm:order-2">
        <Image
          src="/profile.webp"
          alt="dimmasyusuf Profile Image"
          width="350"
          height="350"
          className="shape"
          priority={true}
        />
      </div>
    </div>
  );
}
