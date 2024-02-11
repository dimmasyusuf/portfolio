'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import GuestItem from './GuestItem';
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

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
    enabled: status === 'authenticated',
  });

  return (
    <ScrollArea className="h-[625px] w-full border p-4 rounded-md bg-card dark:bg-accent mx-4 mt-8 mb-4">
      <div className="min-h-[591px] flex flex-col">
        <div className="min-h-[537px] flex flex-col gap-6">
          {messageLoading
            ? Array.from({ length: 8 })?.map((_, index: number) => (
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
  );
}
