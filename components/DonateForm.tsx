'use client';

import { donateInputSchema } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useState } from 'react';
import { Button } from './ui/button';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';

export default function DonateForm() {
  const [step, setStep] = useState(1);
  const [totalUnit, setTotalUnit] = useState(1);
  const [totalPrice, setTotalPrice] = useState(5000);

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

  return (
    <div className="flex flex-col rounded-md p-6 gap-6 bg-background dark:bg-accent border h-[569px] justify-between">
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Donate
        </h3>
        <p className="text-sm text-muted-foreground">Step {step} of 3</p>
      </div>

      {step === 1 && (
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <div className="h-32 w-32">
              <Image
                src="/images/icon_coffee.png"
                alt="Coffee"
                width={256}
                height={256}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg">Coffee</span>
              <span className="text-sm text-muted-foreground">
                Rp 5.000 / Unit
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center justify-center w-full">
            <span className="text-lg font-bold">
              Rp {totalPrice * totalUnit}
            </span>

            <div className="flex gap-3 items-center">
              <Button
                size="icon"
                onClick={() => setTotalUnit(totalUnit - 1)}
              >
                <MinusIcon className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max="9999"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-16 h-10 remove-arrow shadow-none text-center"
                value={totalUnit}
              />
              <Button
                size="icon"
                onClick={() => setTotalUnit(totalUnit + 1)}
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full">
              <Button
                variant="outline"
                className="shadow-none"
              >
                5 Units
              </Button>
              <Button
                variant="outline"
                className="shadow-none"
              >
                10 Units
              </Button>
              <Button
                variant="outline"
                className="shadow-none"
              >
                25 Units
              </Button>
              <Button
                variant="outline"
                className="shadow-none"
              >
                100 Units
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mb-auto"
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
          </form>
        </Form>
      )}

      <div className="flex justify-between items-center w-full">
        {step > 1 && (
          <Button
            variant="secondary"
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeftIcon className="mr-2 w-4 h-4" />
            Back
          </Button>
        )}
        {step < 3 && (
          <Button
            onClick={() => setStep(step + 1)}
            className="ml-auto"
          >
            Next <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )}
        {step === 3 && (
          <Button onClick={() => setStep(1)}>
            Donate <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
