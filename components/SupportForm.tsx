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
  const { status, data: session } = useSession();
  const [step, setStep] = useState(1);
  const [totalCoffee, setTotalCoffee] = useState(1);
  const [totalPrice, setTotalPrice] = useState(5000);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

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
    const amount = totalCoffee * totalPrice;

    await createSupportMutation({
      name,
      message,
      totalCoffee,
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
    const coffee = parseInt(value);

    if (coffee < 1) setTotalCoffee(1);
    else if (coffee > 9999) setTotalCoffee(9999);
    else setTotalCoffee(coffee);
  };

  const handleInputBlur = () => {
    if (isNaN(totalCoffee)) {
      setTotalCoffee(1);
      setTotalPrice(5000);
    }
  };

  const handleSupport = async () => {
    const externalId = 'support-' + Date.now();
    const amount = totalCoffee * totalPrice;
    const payerEmail = user?.email!;
    const description =
      totalCoffee > 1 ? `${totalCoffee} cups of coffee` : '1 cup of coffee';

    const response = await createInvoiceMutation({
      externalId,
      amount,
      payerEmail,
      description,
    });

    const invoiceUrl = response.invoiceUrl;

    router.push(invoiceUrl);
  };

  const handleAuth = () => {
    if (!session) {
      setShowAuthDialog(true);
    } else {
      setStep(step + 1);
    }
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
            <Image
              src="/images/icon_supportitem.webp"
              width={128}
              height={128}
              alt="Coffee Icon"
              className="w-32 h-32"
            />
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg">Coffee</span>
              <span className="text-sm text-muted-foreground">
                Rp 5.000 / Cup
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center justify-center w-full">
            <span className="text-lg font-bold">
              Rp{' '}
              {isNaN(totalCoffee)
                ? totalPrice.toLocaleString('id-ID')
                : (totalCoffee * totalPrice).toLocaleString('id-ID')}
            </span>

            <div className="flex gap-3 items-center">
              <Button
                size="icon"
                onClick={() => setTotalCoffee(totalCoffee - 1)}
                disabled={totalCoffee <= 1}
              >
                <MinusIcon className="w-4 h-4" />
              </Button>
              <Input
                value={isNaN(totalCoffee) ? '' : totalCoffee}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="w-16 h-10 shadow-none text-center dark:border-neutral-50"
              />
              <Button
                size="icon"
                onClick={() => setTotalCoffee(totalCoffee + 1)}
                disabled={totalCoffee >= 9999}
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full">
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalCoffee(5)}
              >
                5 Cups
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalCoffee(10)}
              >
                10 Cups
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalCoffee(25)}
              >
                25 Cups
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalCoffee(50)}
              >
                50 Cups
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
              {isNaN(totalCoffee)
                ? totalPrice.toLocaleString('id-ID')
                : (totalCoffee * totalPrice).toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col my-auto">
          <Image
            src="/images/icon_supportsuccess.webp"
            width={128}
            height={128}
            alt="Party Hat Icon"
            className="w-32 h-32"
          />
          <span className="font-semibold mt-16">THANK YOU</span>
          <p className="text-sm text-muted-foreground">
            Your support will help me to keep coding and sharing knowledge with
            the community 👋🏻
          </p>
        </div>
      )}

      {showAuthDialog && (
        <AuthDialog
          showAuth={showAuthDialog}
          setShowAuth={setShowAuthDialog}
        />
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
            onClick={handleAuth}
            className="ml-auto"
          >
            Next <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )}

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
