'use client';

import moment from 'moment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { formatDate, getInitials, obfuscateEmail } from '@/lib/utils';
import { Button } from './ui/button';
import { getCurrentSupport } from '@/lib/actions/support.action';
import { useQuery } from '@tanstack/react-query';
import { redirect, useSearchParams } from 'next/navigation';
import { Skeleton } from './ui/skeleton';
import { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import AuthDialog from './AuthDialog';

const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';

export default function SupportStatus() {
  const params = useSearchParams();
  const order_id = params.get('order_id');
  const clientKey = process.env.MIDTRANS_CLIENT_KEY as string;
  const { status: authStatus } = useSession();
  const [step, setStep] = useState(1);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: currentSupport, isLoading: supportLoading } = useQuery({
    queryKey: ['payment'],
    queryFn: () => getCurrentSupport(order_id!),
    enabled: order_id !== null,
  });

  const handleAuthDialog = () => {
    if (authStatus === 'unauthenticated') {
      setShowAuthDialog(true);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    document.body.appendChild(script);

    handleAuthDialog();

    return () => {
      document.body.removeChild(script);
    };
  }, [handleAuthDialog]);

  if (order_id === null) {
    redirect('/support');
  }

  if (supportLoading) {
    return (
      <Skeleton className="h-[641px] w-full rounded-md m-4 mt-8 sm:mt-4" />
    );
  }

  if (currentSupport) {
    const {
      name,
      message,
      orderId,
      totalCoffee,
      price,
      amount,
      status,
      token,
      expiryTime,
      createdAt,
      user,
    } = currentSupport;

    const handlePayNow = () => {
      setIsSubmitting(true);

      setTimeout(() => {
        if (token) {
          window.snap.embed(token, {
            embedId: 'snap-status',
          });
        }

        setStep(2);
        setIsSubmitting(false);
      }, 1000);
    };

    return (
      <section className="flex flex-col gap-6 w-full m-4 mt-8 sm:mt-4 h-[641px]">
        {status === 'SUCCESS' && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-primary-foreground">
              Thank you for your support!
            </h1>
            <p className="text-lg text-center text-secondary-foreground">
              Your support has been successfully processed.
            </p>
          </div>
        )}

        {status === 'PENDING' && step === 1 && (
          <div className="flex flex-col justify-between p-4 h-full border bg-background dark:bg-accent dark:text-primary-foreground rounded-md">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 p-4 border bg-background dark:bg-accent dark:text-secondary-foreground dark:border-neutral-50 rounded-md">
                <div className="flex gap-2 w-full">
                  <Avatar className="rounded-md w-10 h-10 aspect-square">
                    <AvatarImage
                      src={user.image!}
                      width={40}
                      height={40}
                      alt={user.name!}
                    />
                    <AvatarFallback className="rounded-md w-10 h-10 aspect-square bg-primary text-primary-foreground">
                      {getInitials(user?.name!)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col w-full">
                    <div className="flex gap-x-1 gap-y-0 items-center flex-wrap">
                      <span className="text-sm font-semibold whitespace-nowrap">
                        {name}
                      </span>
                      <span className="text-sm whitespace-nowrap">
                        supports
                      </span>
                      <span className="flex gap-0.5 items-center text-sm font-semibold whitespace-nowrap">
                        <Image
                          src="/images/icon_supportitem.webp"
                          alt="Coffee Icon"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        {totalCoffee} {totalCoffee > 1 ? 'Cups' : 'Cup'}
                      </span>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {formatDate(createdAt)}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-balance">{message}</span>
              </div>

              <div className="flex items-center gap-4 justify-between p-4 border bg-background dark:bg-accent dark:text-secondary-foreground dark:border-neutral-50 rounded-md">
                <div className="flex flex-col w-full">
                  <span className="flex gap-0.5 items-center text-sm font-semibold whitespace-nowrap">
                    <Image
                      src="/images/icon_supportitem.webp"
                      alt="Coffee Icon"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    {totalCoffee} {totalCoffee > 1 ? 'Cups' : 'Cup'}
                  </span>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Rp {price.toLocaleString('id-ID')} / Cup
                  </span>
                </div>
                <span className="text-lg font-bold whitespace-nowrap">
                  Rp {amount.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex flex-col gap-4 p-4 border bg-background dark:bg-accent dark:text-secondary-foreground dark:border-neutral-50 rounded-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Payment Status
                    </span>
                    <span className="text-sm">{status}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Expire Time
                    </span>
                    <span className="text-sm">
                      {moment(expiryTime).calendar()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Order ID
                    </span>
                    <span className="text-sm">{orderId}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Order Date
                    </span>
                    <span className="text-sm">
                      {moment(createdAt).format('DD MMMM YYYY, HH:mm a')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Email Supporter
                  </span>
                  <span className="text-sm">
                    {obfuscateEmail(user?.email!)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handlePayNow}
                variant="outline"
                className="shadow-none dark:border-neutral-50 dark:hover:bg-primary dark:text-secondary-foreground dark:hover:text-primary-foreground"
              >
                Cancel
              </Button>

              <Button onClick={handlePayNow}>
                {isSubmitting ? (
                  <ReloadIcon className="animate-spin w-4 h-4" />
                ) : (
                  <>Support Now</>
                )}
              </Button>
            </div>
          </div>
        )}

        {status === 'FAILED' && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-primary-foreground">
              Payment Failed
            </h1>
            <p className="text-lg text-center text-secondary-foreground">
              Your payment has failed. Please try again.
            </p>
            <Button
              size="lg"
              onClick={handlePayNow}
              className="mt-4"
            >
              Retry Payment
            </Button>
          </div>
        )}

        <div
          id="snap-status"
          className={`${
            step === 1
              ? 'hidden'
              : 'w-full h-full bg-background dark:bg-accent rounded-md border'
          }`}
        />

        {showAuthDialog && (
          <AuthDialog
            showAuth={showAuthDialog}
            setShowAuth={setShowAuthDialog}
          />
        )}
      </section>
    );
  }
}
