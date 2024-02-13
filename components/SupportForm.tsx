'use client';

import React, { useEffect, useState } from 'react';
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
import { supportInputSchema } from '@/lib/validator';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/actions/user.action';
import { useSession } from 'next-auth/react';
import AuthDialog from './AuthDialog';
import { createSupport } from '@/lib/actions/support.action';
import {
  createPayment,
  createPaymentToken,
  getCurrentPayment,
} from '@/lib/actions/midtrans.action';
import { splitFullName } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';

export default function SupportForm() {
  const pathName = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const { status, data: session } = useSession();
  const [step, setStep] = useState(1);
  const [totalCoffee, setTotalCoffee] = useState(1);
  const [totalPrice, setTotalPrice] = useState(5000);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [token, setToken] = useState('');
  const [snapShown, setSnapShown] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('PENDING');
  const clientKey = process.env.MIDTRANS_CLIENT_KEY as string;
  const queryClient = useQueryClient();

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

  const { mutateAsync: createPaymentTokenMutation } = useMutation({
    mutationFn: createPaymentToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support'] });
    },
  });

  const { mutateAsync: createPaymentMutation } = useMutation({
    mutationFn: createPayment,
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

    if (status === 'authenticated' && step === 3) {
      handlePaymentStatus();
    }

    if (paymentStatus === 'SUCCESS') {
      handleSupport(name, message, totalCoffee);
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [form.formState.errors, params, status, paymentStatus]);

  const handlePaymentStatus = async () => {
    const payment = await getCurrentPayment(orderId);
    const status = payment?.status;

    if (status === 'SUCCESS') {
      setPaymentStatus(status);
    } else {
      setTimeout(() => {
        handlePaymentStatus();
      }, 3000);
    }
  };

  const handleSupport = async (
    name: string,
    message: string,
    amount: number
  ) => {
    await createSupportMutation({
      name,
      message,
      order_id: orderId,
      totalCoffee,
      amount,
    });

    setStep(4);
  };

  const handleFormErrors = () => {
    if (form.formState.errors.name || form.formState.errors.message) {
      setStep(2);
    }
  };

  const handleStepParam = (stepParam: string) => {
    if (stepParam && !isNaN(parseInt(stepParam))) {
      const newPage = parseInt(stepParam);
      if (status === 'authenticated' && newPage !== 4 && newPage !== 3) {
        setStep(newPage);
      } else if (status === 'unauthenticated') {
        setShowAuthDialog(true);
      } else if (newPage === 4) {
        handleStepFour(newPage);
      } else if (newPage === 3 && token === '') {
        setStep(1);
      }
    }
  };

  const handleStepFour = (newPage: number) => {
    setStep(newPage);
    setTimeout(() => {
      setStep(1);
    }, 5000);
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
      setTotalPrice(5000);
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

  const handlePaymentToken = async () => {
    const id = 'coffee-' + Date.now();
    const order_id = 'support-' + Date.now();
    const gross_amount = totalCoffee * totalPrice;
    const quantity = totalCoffee;
    const { first_name, last_name } = splitFullName(user?.name!);
    const email = user?.email!;

    const paymentToken = await createPaymentTokenMutation({
      order_id,
      gross_amount,
      id,
      quantity,
      first_name,
      last_name,
      email,
    });

    setToken(paymentToken);
    setOrderId(order_id);

    handleStepChange(step + 1);

    if (!snapShown) {
      window.snap.embed(paymentToken, {
        embedId: 'snap-container',
      });

      setSnapShown(true);

      await createPaymentMutation({
        order_id,
        gross_amount,
      });
    }
  };

  async function onSubmit(values: z.infer<typeof supportInputSchema>) {
    const { name, message } = values;

    setName(name);
    setMessage(message);

    handlePaymentToken();

    form.reset();
  }

  return (
    <div
      className={`${
        step === 3
          ? 'flex flex-col justify-between p-0 gap-6 rounded-md bg-background dark:bg-accent border h-[641px]'
          : 'flex flex-col rounded-md p-6 gap-6 bg-background dark:bg-accent border h-[641px] justify-between'
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

            <div className="grid grid-cols-2 gap-2 w-full">
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

      <div
        id="snap-container"
        className={`${step === 3 ? 'h-full w-full rounded-t-md' : 'hidden'}`}
      ></div>

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

      <div
        className={`${
          step === 3 && 'mx-6 mb-6'
        } flex justify-between items-center`}
      >
        {step > 1 && step <= 3 && (
          <Button
            size="sm"
            variant="outline"
            className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:hover:text-primary-foreground"
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
            Support <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )}

        {/* {step === 4 && (
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
          >
            Support <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        )} */}
      </div>
    </div>
  );
}
