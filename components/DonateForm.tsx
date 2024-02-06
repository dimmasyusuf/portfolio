'use client';

import { donateInputSchema } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { DonateDialog } from './DonateDialog';

export default function DonateForm() {
  const form = useForm<z.infer<typeof donateInputSchema>>({
    resolver: zodResolver(donateInputSchema),
    defaultValues: {
      name: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof donateInputSchema>) {
    console.log(values);
  }

  const openDialog = form.formState.isSubmitSuccessful;

  return (
    <div className="flex flex-col rounded-md p-6 gap-6 bg-background dark:bg-accent border">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name (Optional)"
                    className="shadow-none h-12 dark:border-neutral-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    className="shadow-none dark:border-neutral-50 h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DonateDialog openDialog={openDialog} />
        </form>
      </Form>
    </div>
  );
}
