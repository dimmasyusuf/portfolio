import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import prisma from '@/lib/prismadb';

export default function GuestProfile() {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-1">
        <Image
          src="/profile.webp"
          alt="profile"
          width={40}
          height={40}
          className="rounded-md"
        />
        <ChevronDownIcon className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col overflow-hidden">
          <p className="font-bold truncate">Dimas Yusuf Qurohman</p>
          <p className="text-sm text-muted-foreground truncate">
            dimasyusufqurohman@gmail.com
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
