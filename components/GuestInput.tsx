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
import { Textarea } from './ui/textarea';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

export default function GuestInput() {
  const form = useForm<z.infer<typeof guestInputSchema>>({
    resolver: zodResolver(guestInputSchema),
    defaultValues: {
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof guestInputSchema>) {
    console.log(values);
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
