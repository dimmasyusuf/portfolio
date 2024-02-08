'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { donateInputSchema } from '@/lib/validator';

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

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const unit = parseInt(value);

    if (unit < 1) setTotalUnit(1);
    else if (unit > 9999) setTotalUnit(9999);
    else setTotalUnit(unit);
  };

  const handleUnitBlur = () => {
    if (isNaN(totalUnit)) {
      setTotalUnit(1);
      setTotalPrice(5000);
    }
  };

  return (
    <div className="flex flex-col rounded-md p-6 gap-6 bg-background dark:bg-accent border h-[586px] sm:h-[569px] justify-between">
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
              Rp{' '}
              {isNaN(totalUnit)
                ? totalPrice.toLocaleString('id-ID')
                : (totalUnit * totalPrice).toLocaleString('id-ID')}
            </span>

            <div className="flex gap-3 items-center">
              <Button
                size="icon"
                onClick={() => setTotalUnit(totalUnit - 1)}
                disabled={totalUnit <= 1}
              >
                <MinusIcon className="w-4 h-4" />
              </Button>
              <Input
                value={isNaN(totalUnit) ? '' : totalUnit}
                onChange={handleUnitChange}
                onBlur={handleUnitBlur}
                className="w-16 h-10 shadow-none text-center dark:border-neutral-50"
              />
              <Button
                size="icon"
                onClick={() => setTotalUnit(totalUnit + 1)}
                disabled={totalUnit >= 9999}
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalUnit(5)}
              >
                5 Units
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalUnit(10)}
              >
                10 Units
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalUnit(25)}
              >
                25 Units
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalUnit(100)}
              >
                100 Units
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4 h-full">
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
                        placeholder="Name"
                        className="shadow-none dark:border-neutral-50"
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
                        placeholder="Support Message"
                        className="shadow-none dark:border-neutral-50 h-52"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="flex gap-2 justify-between items-center rounded-md p-4 border dark:border-neutral-50">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-sm font-semibold">
              Rp{' '}
              {isNaN(totalUnit)
                ? totalPrice.toLocaleString('id-ID')
                : (totalUnit * totalPrice).toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center w-full">
        {step > 1 && (
          <Button
            size="sm"
            variant="outline"
            className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeftIcon className="mr-2 w-4 h-4" />
            Back
          </Button>
        )}
        {step < 3 && (
          <Button
            size="sm"
            onClick={() => setStep(step + 1)}
            className="ml-auto"
          >
            Next <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )}
        {step === 3 && (
          <Button
            size="sm"
            onClick={() => setStep(1)}
          >
            Donate <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
