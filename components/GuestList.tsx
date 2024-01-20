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

export default function GuestList() {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getAllMessages(),
  });

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
  });

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Guestbook</h2>
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
            {messages?.map((message) => (
              <GuestItem
                key={message.id}
                message={message}
                isLoading={isLoading}
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
