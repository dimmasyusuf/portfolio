'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import GuestItem from './GuestItem';
import GuestProfile from './GuestProfile';
import GuestInput from './GuestInput';
import { Message, User } from '@/types';
import { getUserProfile } from '@/lib/actions/user.action';
import { getAllMessages } from '@/lib/actions/message.action';
import { handleError } from '@/lib/utils';

export default function GuestList() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const updateMessages = (newMessage: Message) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

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

  const fetchMessages = async () => {
    const messages = await getAllMessages();
    setMessages(messages);
  };

  useEffect(() => {
    fetchUser();
    fetchMessages();
  }, []);

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
            {messages.map((message) => (
              <GuestItem
                key={message.id}
                user={user}
                {...message}
              />
            ))}
          </div>
          <GuestInput updateMessages={updateMessages} />
        </div>
      </ScrollArea>
    </section>
  );
}
