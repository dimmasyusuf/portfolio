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
  const { data: messages } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getAllMessages(),
  });

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
    placeholderData: null,
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
            {messages?.map((message) => (
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
