'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import GuestItem from './GuestItem';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import GuestProfile from './GuestProfile';
import GuestInput from './GuestInput';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getUserProfile } from '@/lib/actions/user.action';
import { handleError } from '@/lib/utils';

export default function GuestList() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      const email = session?.user?.email;

      if (email) {
        try {
          const sessionUser = await getUserProfile(email);
          setUser(sessionUser);
        } catch (error) {
          handleError(error);
        }
      }
    };

    fetchUser();
  });

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-2xl">Guestbook</h3>
        {user !== null ? (
          <GuestProfile user={user} />
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
