'use client';

import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import {
  ArrowRightIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
import { signInFormSchema } from '@/lib/validator';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignInForm() {
  const [googleHover, setGoogleHover] = useState(false);
  const [githubHover, setGithubHover] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const { status } = useSession();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
      setIsSubmitting(true);

      setTimeout(async () => {
        await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl: '/',
        });
        form.reset();
        setIsSubmitting(false);

        if (status === 'authenticated') {
          router.push('/guestbook');
        } else {
          toast.error('Email or password is incorrect', {
            position: 'top-right',
          });
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col min-w-full sm:min-w-[400px] px-8 py-10 gap-8 rounded-none sm:rounded-xl">
      <div className="flex w-full">
        <Link
          href="/guestbook"
          className="relative flex items-center justify-center h-12 w-12 aspect-square rounded-md"
        >
          <Image
            src={theme === 'dark' ? '/logo_dark.svg' : '/logo_light.svg'}
            alt="dimmasyusuf logo"
            width={48}
            height={48}
            className="rounded-md"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">to continue to dimmasyusuf</p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="flex p-5 shadow-none"
            onMouseOver={() => setGoogleHover(true)}
            onMouseLeave={() => setGoogleHover(false)}
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <div className="flex items-center justify-center h-5 w-5 aspect-square">
              <FcGoogle className="w-full h-full" />
            </div>
            <div className="flex justify-between items-center ml-4 w-full">
              <p className="text-sm text-primary/80 w-fit">
                Continue with Google
              </p>
              {googleHover && <ArrowRightIcon className="w-4 h-4" />}
            </div>
          </Button>
          <Button
            variant="outline"
            className="flex p-5 shadow-none"
            onMouseOver={() => setGithubHover(true)}
            onMouseLeave={() => setGithubHover(false)}
            onClick={() => signIn('github', { callbackUrl: '/' })}
          >
            <div className="flex items-center justify-center h-5 w-5 aspect-square">
              <GitHubLogoIcon className="w-full h-full" />
            </div>
            <div className="flex justify-between items-center ml-4 w-full">
              <p className="text-sm text-primary/80 w-fit">
                Continue with GitHub
              </p>
              {githubHover && <ArrowRightIcon className="w-4 h-4" />}
            </div>
          </Button>
        </div>

        <Separator className="relative flex items-center justify-center">
          <span className="absolute px-4 bg-background text-muted-foreground text-sm">
            or
          </span>
        </Separator>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel className="text-primary text-sm">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel className="text-primary text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="shadow-none"
                        {...field}
                      />
                      {showPassword ? (
                        <div className="absolute flex items-center justify-center right-0.5 py-1 pr-4 pl-2 bg-background rounded-e-md">
                          <span
                            className="flex items-center justify-center w-6 h-6 hover:bg-accent rounded-md"
                            onClick={() => setShowPassword(false)}
                          >
                            <EyeNoneIcon className="text-muted-foreground hover:text-primary w-4 h-4" />
                          </span>
                        </div>
                      ) : (
                        <div className="absolute flex items-center justify-center right-0.5 py-1 pr-4 pl-2 bg-background rounded-e-md">
                          <span
                            className="flex items-center justify-center w-6 h-6 hover:bg-accent rounded-md"
                            onClick={() => setShowPassword(true)}
                          >
                            <EyeOpenIcon className="text-muted-foreground hover:text-primary w-4 h-4" />
                          </span>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="sm"
              className="w-full h-9"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SIGNING IN...' : 'CONTINUE'}
            </Button>
          </form>
        </Form>
      </div>

      <div className="flex gap-1 items-center">
        <p className="text-sm text-muted-foreground">No account?</p>
        <Link
          href="/sign-up"
          className="text-sm text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </section>
  );
}
