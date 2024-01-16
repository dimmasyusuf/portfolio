'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Button } from './ui/button';
import { getSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getUserProfile } from '@/lib/actions/user.action';
import { handleError } from '@/lib/utils';

export default function GuestProfile() {
  const [user, setUser] = useState<User | null>(null);
  const { theme } = useTheme();
  const avatar =
    theme === 'light' ? '/images/avatar_light.png' : '/images/avatar_dark.png';

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
  }, []);

  console.log(user);

  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-1">
        <Image
          src={user?.image || avatar}
          alt={user?.name || 'Guest'}
          width={40}
          height={40}
          className="rounded-md aspect-square object-cover"
        />
        <ChevronDownIcon className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col overflow-hidden">
          <p className="font-bold truncate">{user?.name || 'Guest'}</p>
          <p className="text-sm text-muted-foreground truncate">
            {user?.email || 'guest@mail.com'}
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
