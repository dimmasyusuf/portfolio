'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { User } from '@/types';
import { useState } from 'react';
import { getInitials } from '@/lib/utils';
import { Separator } from './ui/separator';

export default function Authrofile({ user }: { user?: User | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger
        className="flex items-center justify-center"
        aria-label="Open User Profile"
      >
        <Avatar className="rounded-md w-9 h-9">
          <AvatarImage
            src={user?.image!}
            width={36}
            height={36}
            alt={user?.name!}
          />
          <AvatarFallback className="rounded-md w-9 h-9 bg-primary text-primary-foreground">
            {getInitials(user?.name!)}
          </AvatarFallback>
        </Avatar>
        {isOpen ? (
          <ChevronDownIcon className="hidden sm:flex w-4 h-4 ml-0.5 transition-transform duration-200 rotate-180" />
        ) : (
          <ChevronDownIcon className="hidden sm:flex w-4 h-4 ml-0.5" />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex flex-col gap-4 dark:bg-accent dark:shadow-background"
      >
        <div className="flex flex-row gap-2 items-center">
          <Avatar className="rounded-md w-9 h-9">
            <AvatarImage
              src={user?.image!}
              width={36}
              height={36}
              alt={user?.name!}
            />
            <AvatarFallback className="rounded-md w-9 h-9 bg-primary text-primary-foreground">
              {getInitials(user?.name!)}
            </AvatarFallback>
          </Avatar>
          <div className="w-full overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <Separator className="dark:bg-neutral-50" />

        <Button
          size="sm"
          className="w-full"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
