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
  ReloadIcon,
} from '@radix-ui/react-icons';
import { supportInputSchema } from '@/lib/validator';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/actions/user.action';
import { useSession } from 'next-auth/react';
import AuthDialog from './AuthDialog';
import {
  createSupport,
  createSupportToken,
  getAllSupports,
} from '@/lib/actions/support.action';
import { splitFullName } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from './ui/skeleton';

const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';

export default function SupportForm() {
  const pathName = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const price = 5000;
  const { status, data: session } = useSession();
  const [step, setStep] = useState(1);
  const [totalCoffee, setTotalCoffee] = useState(1);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState('');
  const [snapShown, setSnapShown] = useState(false);
  const clientKey = process.env.MIDTRANS_CLIENT_KEY as string;
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
    enabled: status === 'authenticated',
  });

  const { isLoading: supportLoading } = useQuery({
    queryKey: ['support'],
    queryFn: () => getAllSupports(),
  });

  const { mutateAsync: createSupportTokenMutation } = useMutation({
    mutationFn: createSupportToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support'] });
    },
  });

  const { mutateAsync: createSupportMutation } = useMutation({
    mutationFn: createSupport,
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
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    document.body.appendChild(script);

    handleFormErrors();

    const stepParam = params.get('step');
    handleStepParam(stepParam!);

    return () => {
      document.body.removeChild(script);
    };
  }, [form.formState.errors, params, status]);

  const handleFormErrors = () => {
    if (form.formState.errors.name || form.formState.errors.message) {
      setStep(2);
    }
  };

  const handleStepParam = (stepParam: string) => {
    if (stepParam && !isNaN(parseInt(stepParam))) {
      const newPage = parseInt(stepParam);
      if (status === 'authenticated' && newPage !== 3) {
        setStep(newPage);
      } else if (status === 'unauthenticated') {
        setShowAuthDialog(true);
      } else if (newPage === 3 && token === '') {
        setStep(1);
      }
    }
  };

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
    }
  };

  const handleAuth = () => {
    if (!session) {
      setShowAuthDialog(true);
    } else {
      handleStepChange(step + 1);
    }
  };

  const handleStepChange = (newStep: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('step', newStep.toString());

    const queryString = newParams.toString();
    const url = queryString ? `${pathName}?${queryString}` : pathName;

    router.push(url);

    setStep(newStep);
  };

  const handleSupport = async (name: string, message: string) => {
    const id = 'coffee-' + Date.now();
    const order_id = 'support-' + Date.now();
    const gross_amount = totalCoffee * price;
    const quantity = totalCoffee;
    const { first_name, last_name } = splitFullName(user?.name!);
    const email = user?.email!;

    const supportToken = await createSupportTokenMutation({
      order_id,
      gross_amount,
      id,
      quantity,
      first_name,
      last_name,
      email,
    });

    setToken(supportToken);
    handleStepChange(step + 1);

    if (!snapShown) {
      window.snap.embed(supportToken, {
        embedId: 'snap-container',
      });

      setSnapShown(true);

      await createSupportMutation({
        name,
        message,
        order_id,
        price,
        totalCoffee,
        token: supportToken,
      });
    }
  };

  async function onSubmit(values: z.infer<typeof supportInputSchema>) {
    const { name, message } = values;
    setIsSubmitting(true);

    setTimeout(() => {
      handleSupport(name, message);

      setIsSubmitting(false);
    }, 1000);

    form.reset();
  }

  if (supportLoading) {
    return <Skeleton className="h-[641px] w-full rounded-none sm:rounded-md" />;
  }

  return (
    <div
      className={`${
        step === 3
          ? 'flex flex-col justify-between p-0 gap-6 rounded-none sm:rounded-md bg-background border-y sm:border h-[641px]'
          : 'flex flex-col rounded-none sm:rounded-md p-6 gap-6 bg-background border-y sm:border h-[641px] justify-between'
      } `}
    >
      {step <= 2 && (
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
              src="/images/icon_supportcoffee.png"
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
                ? price.toLocaleString('id-ID')
                : (totalCoffee * price).toLocaleString('id-ID')}
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
                className="w-16 h-10 shadow-none text-center"
              />
              <Button
                size="icon"
                onClick={() => setTotalCoffee(totalCoffee + 1)}
                disabled={totalCoffee >= 9999}
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full">
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalCoffee(5)}
              >
                5 Cups
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalCoffee(10)}
              >
                10 Cups
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:hover:bg-primary dark:hover:text-primary-foreground"
                onClick={() => setTotalCoffee(25)}
              >
                25 Cups
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-none dark:hover:bg-primary dark:hover:text-primary-foreground"
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
                      className="shadow-none"
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
                      className="shadow-none h-52"
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

      <div
        id="snap-container"
        className={`${step === 3 ? 'h-full w-full rounded-md' : 'hidden'}`}
      ></div>

      {showAuthDialog && (
        <AuthDialog
          showAuth={showAuthDialog}
          setShowAuth={setShowAuthDialog}
        />
      )}

      <div
        className={`${
          step === 3 && 'hidden'
        } flex justify-between items-center`}
      >
        {step > 1 && step <= 3 && (
          <Button
            size="sm"
            variant="outline"
            className="shadow-none dark:hover:bg-primary dark:hover:text-primary-foreground"
            onClick={() => handleStepChange(step - 1)}
          >
            <ArrowLeftIcon className="mr-2 w-4 h-4" />
            Back
          </Button>
        )}

        {step === 1 && (
          <Button
            size="sm"
            onClick={handleAuth}
            className="ml-auto"
          >
            Next <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )}

        {step === 2 && (
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
            className="ml-auto"
          >
            {isSubmitting ? (
              <ReloadIcon className="animate-spin w-4 h-4" />
            ) : (
              <>
                Support <ArrowRightIcon className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
