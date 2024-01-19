import { Pencil2Icon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMessage } from '@/lib/actions/message.action';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { guestInputSchema } from '@/lib/validator';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Message } from '@/types';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import moment from 'moment';

export default function GuestEditDialog({ message }: { message: Message }) {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const avatar =
    theme === 'light' ? '/images/avatar_light.png' : '/images/avatar_dark.png';
  const formattedCreatedAt = moment(message?.createdAt).fromNow();

  const { mutateAsync: updateMessageMutation } = useMutation({
    mutationFn: updateMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const form = useForm<z.infer<typeof guestInputSchema>>({
    resolver: zodResolver(guestInputSchema),
    defaultValues: {
      message: message?.text,
    },
  });

  function onSubmit(values: z.infer<typeof guestInputSchema>) {
    try {
      setIsSubmitting(true);
      const id = message.id;
      const text = values.message;

      setTimeout(async () => {
        await updateMessageMutation({ id, text });

        setIsSubmitting(false);
        setIsOpen(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-between w-full px-2 py-1.5 text-sm rounded-sm font-normal"
        >
          Edit <Pencil2Icon className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col max-w-sm sm:max-w-md rounded-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center w-10 h-10 aspect-square">
            <Image
              src={message?.author?.image || avatar}
              alt={message?.author?.name || 'Guest'}
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full overflow-hidden">
            <p className="font-bold text-sm truncate">
              {message?.author?.name}
            </p>
            <p className="text-xs truncate">{formattedCreatedAt}</p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
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
            <div className="flex gap-2 items-center">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
