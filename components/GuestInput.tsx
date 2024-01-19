'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PaperPlaneIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { handleError } from '@/lib/utils';
import { guestInputSchema } from '@/lib/validator';
import { createMessage } from '@/lib/actions/message.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function GuestInput() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: createMessageMutation } = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const form = useForm<z.infer<typeof guestInputSchema>>({
    resolver: zodResolver(guestInputSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof guestInputSchema>) {
    const session = await getSession();
    if (!session) router.push('/sign-in');

    try {
      setIsSubmitting(true);

      const text = values.message;

      setTimeout(async () => {
        await createMessageMutation(text);

        form.reset();
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      handleError(error);
    }
  }

  async function handleInput() {
    const session = await getSession();
    if (!session) router.push('/sign-in');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bg-card dark:bg-accent bottom-0 z-10 pl-0.5 pb-0.5 pt-4 flex w-full justify-between gap-4 items-center"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Leave a message"
                  className="flex w-full shadow-none dark:border-neutral-50"
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
          aria-label="Send Message"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ReloadIcon className="w-4 h-4 animate-spin" />
          ) : (
            <PaperPlaneIcon className="w-4 h-4" />
          )}
        </Button>
      </form>
    </Form>
  );
}
