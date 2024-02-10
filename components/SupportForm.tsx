'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Button } from './ui/button';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { supportInputSchema } from '@/lib/validator';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/actions/user.action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthDialog from './AuthDialog';
import { createInvoice } from '@/lib/actions/xendit.action';
import { createSupport } from '@/lib/actions/support.action';

export default function SupportForm() {
  const { status } = useSession();
  const [step, setStep] = useState(1);
  const [totalBurger, setTotalBurger] = useState(1);
  const [totalPrice, setTotalPrice] = useState(5000);
  const queryClient = useQueryClient();
  const router = useRouter();

  console.log('status', status);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
    enabled: status === 'authenticated',
  });

  const { mutateAsync: createSupportMutation } = useMutation({
    mutationFn: createSupport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support'] });
    },
  });

  const { mutateAsync: createInvoiceMutation } = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support'] });
    },
  });

  const form = useForm<z.infer<typeof supportInputSchema>>({
    resolver: zodResolver(supportInputSchema),
    defaultValues: {
      name: '',
      message: '',
    },
  });

  useEffect(() => {
    if (form.formState.errors.name || form.formState.errors.message) {
      setStep(2);
    }
  }, [form.formState.errors]);

  async function onSubmit(values: z.infer<typeof supportInputSchema>) {
    const { name, message } = values;
    const amount = totalBurger * totalPrice;

    await createSupportMutation({
      name,
      message,
      totalBurger,
      amount,
    });

    form.reset();

    setStep(4);

    setTimeout(() => {
      setStep(1);
    }, 5000);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const unit = parseInt(value);

    if (unit < 1) setTotalBurger(1);
    else if (unit > 9999) setTotalBurger(9999);
    else setTotalBurger(unit);
  };

  const handleInputBlur = () => {
    if (isNaN(totalBurger)) {
      setTotalBurger(1);
      setTotalPrice(5000);
    }
  };

  const handleSupport = async () => {
    const externalId = 'donation-' + Date.now();
    const amount = totalBurger * totalPrice;
    const payerEmail = user?.email!;
    const description = `Donation for ${totalBurger} burgers`;

    const response = await createInvoiceMutation({
      externalId,
      amount,
      payerEmail,
      description,
    });

    const invoiceUrl = response.invoiceUrl;

    router.push(invoiceUrl);
  };

  return (
    <div className="flex flex-col rounded-md p-6 gap-6 bg-background dark:bg-accent border h-[546px] sm:h-[569px] justify-between">
      {step <= 3 && (
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Support
          </h3>
          <p className="text-sm text-muted-foreground">Step {step} of 3</p>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <span className="text-9xl">🍔</span>
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg">Burger</span>
              <span className="text-sm text-muted-foreground">
                Rp 5.000 / Burger
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center justify-center w-full">
            <span className="text-lg font-bold">
              Rp{' '}
              {isNaN(totalBurger)
                ? totalPrice.toLocaleString('id-ID')
                : (totalBurger * totalPrice).toLocaleString('id-ID')}
            </span>

            <div className="flex gap-3 items-center">
              <Button
                size="icon"
                onClick={() => setTotalBurger(totalBurger - 1)}
                disabled={totalBurger <= 1}
              >
                <MinusIcon className="w-4 h-4" />
              </Button>
              <Input
                value={isNaN(totalBurger) ? '' : totalBurger}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="w-16 h-10 shadow-none text-center dark:border-neutral-50"
              />
              <Button
                size="icon"
                onClick={() => setTotalBurger(totalBurger + 1)}
                disabled={totalBurger >= 9999}
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full">
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalBurger(5)}
              >
                5 Burgers
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalBurger(10)}
              >
                10 Burgers
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalBurger(20)}
              >
                20 Burgers
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
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4 h-full">
          <div className="flex gap-2 justify-between items-center rounded-md px-4 py-2 border dark:border-neutral-50 mt-auto">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-sm font-semibold">
              Rp{' '}
              {isNaN(totalBurger)
                ? totalPrice.toLocaleString('id-ID')
                : (totalBurger * totalPrice).toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col my-auto">
          <span className="text-9xl w-full">🎉</span>
          <span className="font-semibold mt-16">THANK YOU</span>
          <p className="text-sm text-muted-foreground">
            Your support will help me to keep coding and sharing knowledge with
            the community 👋🏻
          </p>
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

        {step < 3 &&
          (user ? (
            <Button
              size="sm"
              onClick={() => setStep(step + 1)}
              className="ml-auto"
            >
              Next <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <AuthDialog />
          ))}

        {step === 3 && (
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
          >
            Support <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
