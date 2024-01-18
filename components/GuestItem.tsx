'use client';

import Image from 'next/image';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Separator } from './ui/separator';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { Message, User } from '@/types';
import { useTheme } from 'next-themes';
import moment from 'moment';
import GuestEditDialog from './GuestEditDialog';
import GuestDeleteDialog from './GuestDeleteDialog';
import { useState } from 'react';

export default function GuestItem({
  message,
  user,
}: {
  message: Message;
  user?: User | null;
}) {
  const { id, text, createdAt, author } = message;
  const [isClose, setIsClose] = useState(false);

  const { theme } = useTheme();
  const avatar =
    theme === 'light' ? '/images/avatar_light.png' : '/images/avatar_dark.png';
  const formattedCreatedAt = moment(createdAt).fromNow();
  const authorEmail = author?.email;
  const sessionEmail = user?.email;
  const isAuthor = authorEmail === sessionEmail;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2 w-full">
          <div className="relative flex items-center justify-center w-10 h-10 aspect-square">
            <Image
              src={author?.image || avatar}
              alt="profile"
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center gap-2">
              <p className="font-bold text-sm line-clamp-1">{author?.name}</p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {formattedCreatedAt}
              </p>
            </div>
            <p className="text-xs">{text}</p>
          </div>
        </div>

        {isAuthor && (
          <Menubar className="flex justify-center h-7 w-4 p-0">
            <MenubarMenu>
              <MenubarTrigger
                aria-label="Open Options"
                className="flex items-center justify-center hover:bg-accent h-7 w-4 p-0"
                onClick={() => setIsClose(false)}
              >
                <DotsVerticalIcon className="w-4 h-4" />
              </MenubarTrigger>
              <MenubarContent
                align="end"
                className={`${isClose && 'hidden'} }`}
              >
                <MenubarItem
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => setIsClose(true)}
                  className="p-0"
                >
                  <GuestEditDialog message={message} />
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => setIsClose(true)}
                  className="p-0"
                >
                  <GuestDeleteDialog id={id} />
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>
      <Separator />
    </div>
  );
}
