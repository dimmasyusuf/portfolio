'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { guestInputSchema } from '@/lib/validator';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

export default function GuestInput() {
  const router = useRouter();

  const form = useForm<z.infer<typeof guestInputSchema>>({
    resolver: zodResolver(guestInputSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof guestInputSchema>) {
    const session = await getSession();

    if (!session) router.push('/sign-in');

    console.log(values);
  }

  async function handleInput() {
    const session = await getSession();
    if (!session) router.push('/sign-in');
    console.log('session', session);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bg-background bottom-0 z-10 pl-0.5 pb-0.5 pt-4 flex w-full justify-between gap-4"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Leave a message"
                  className="flex w-full shadow-none"
                  onFocus={handleInput}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Send Message"
        >
          <PaperPlaneIcon className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
}
