'use client';

import Image from 'next/image';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message, User } from '@/types';
import GuestEditDialog from './GuestEditDialog';
import GuestDeleteDialog from './GuestDeleteDialog';
import { useState } from 'react';
import { formatDate, getInitials } from '@/lib/utils';

export default function GuestItem({
  message,
  user,
}: {
  message: Message;
  user?: User | null;
}) {
  const { id, text, createdAt, author } = message;
  const [isClose, setIsClose] = useState(false);
  const authorEmail = author?.email;
  const sessionEmail = user?.email;
  const isAuthor = authorEmail === sessionEmail;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2 w-full">
          <Avatar className="rounded-md w-10 h-10 aspect-square">
            <AvatarImage
              src={author?.image!}
              width={40}
              height={40}
              alt={author?.name!}
            />
            <AvatarFallback className="rounded-md w-10 h-10 aspect-square bg-primary text-primary-foreground">
              {getInitials(author?.name!)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center gap-2">
              <h3 className="font-bold text-sm line-clamp-1">{author?.name}</h3>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(createdAt)}
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
                className="flex items-center justify-center bg-background hover:bg-accent dark:bg-accent dark:hover:bg-background h-7 w-4 p-0"
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
    </div>
  );
}
