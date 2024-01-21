'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import GuestItem from './GuestItem';
import GuestProfile from './GuestProfile';
import GuestInput from './GuestInput';
import { getUserProfile } from '@/lib/actions/user.action';
import { getAllMessages } from '@/lib/actions/message.action';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Skeleton } from './ui/skeleton';

export default function GuestList() {
  const { status } = useSession();

  const { data: messages, isLoading: messageLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getAllMessages(),
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
    enabled: status === 'authenticated',
  });

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Guestbook</h2>
        {userLoading ? (
          <Skeleton className="w-10 h-10 aspect-square rounded-md" />
        ) : (
          <>
            {user ? (
              <GuestProfile user={user} />
            ) : (
              <Button
                size="sm"
                asChild
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            )}
          </>
        )}
      </div>
      <ScrollArea
        className={`${
          user ? 'h-[561px]' : 'h-[569px]'
        } w-full border p-4 rounded-md bg-card dark:bg-accent`}
      >
        <div
          className={`${
            user ? 'min-h-[527px]' : 'min-h-[535px]'
          } flex flex-col`}
        >
          <div
            className={`${
              user ? 'min-h-[473px]' : 'min-h-[481px]'
            } flex flex-col gap-6`}
          >
            {messageLoading
              ? Array.from({ length: 7 })?.map((_, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between gap-2 w-full items-center"
                  >
                    <Skeleton className="w-10 h-10 aspect-square rounded-md" />
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-center gap-2">
                        <Skeleton className="w-4/12 h-4" />
                        <Skeleton className="w-16 h-4" />
                      </div>
                      <Skeleton className="w-6/12 h-4" />
                    </div>
                  </div>
                ))
              : messages?.map((message) => (
                  <GuestItem
                    key={message.id}
                    message={message}
                    user={user}
                  />
                ))}
          </div>
          <GuestInput />
        </div>
      </ScrollArea>
    </section>
  );
}
