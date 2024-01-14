'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import GuestItem from './GuestItem';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import GuestProfile from './GuestProfile';
import GuestInput from './GuestInput';

export default function GuestList() {
  const { status } = useSession();

  console.log(status);

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-2xl">Guestbook</h3>
        {status === 'authenticated' ? (
          <GuestProfile />
        ) : (
          <Button
            size="sm"
            asChild
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
        )}
      </div>
      <ScrollArea className="w-full h-[565px] border p-4 rounded-md">
        <div className="flex flex-col min-h-[531px]">
          <div className="flex flex-col gap-4 min-h-[477px]">
            <GuestItem />
          </div>
          <GuestInput />
        </div>
      </ScrollArea>
    </section>
  );
}
