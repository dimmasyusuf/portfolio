'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useSession, signIn } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import {
  ArrowRightIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { createUser, getUserProfile } from '@/lib/actions/user.action';
import { signInFormSchema, signUpFormSchema } from '@/lib/validator';
import { Separator } from './ui/separator';
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
import { Dispatch, useCallback, useState } from 'react';

export default function AuthForm({
  openAuth,
}: {
  openAuth: Dispatch<boolean>;
}) {
  const queryClient = useQueryClient();
  const { theme } = useTheme();

  const [variant, setVariant] = useState('signin');
  const [googleHover, setGoogleHover] = useState(false);
  const [githubHover, setGithubHover] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'signin' ? 'signup' : 'signin'
    );

    signUpForm.reset();
    signInForm.reset();
  }, []);

  const { mutateAsync: createUserMutation } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const { mutateAsync: signInMutation } = useMutation({
    mutationFn: getUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSignUp(values: z.infer<typeof signUpFormSchema>) {
    try {
      setIsSubmitting(true);
      const name = values.name;
      const email = values.email;
      const password = values.password;

      setTimeout(async () => {
        await createUserMutation({ name, email, password });

        signUpForm.reset();
        setIsSubmitting(false);

        toggleVariant();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  function onSignIn(values: z.infer<typeof signInFormSchema>) {
    try {
      setIsSubmitting(true);

      setTimeout(async () => {
        const response = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (response?.error === null) {
          await signInMutation();

          signInForm.reset();
          setIsSubmitting(false);
          openAuth(false);
        } else {
          toast.error(`${response?.error}`, {
            position: 'top-right',
          });
          signInForm.reset();
          setIsSubmitting(false);
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col min-w-full sm:min-w-[400px] px-8 py-10 gap-8 bg-background rounded-none sm:rounded-lg my-auto">
      <div className="flex w-full">
        <div
          onClick={() => openAuth(false)}
          className="relative flex items-center justify-center h-12 w-12 aspect-square rounded-md cursor-pointer"
        >
          <Image
            src={
              theme === 'dark'
                ? '/images/logo_dark.svg'
                : '/images/logo_light.svg'
            }
            alt="dimmasyusuf logo"
            width={48}
            height={48}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">
          {variant === 'signin' ? 'Sign In' : 'Create your account'}
        </h1>
        <p className="text-muted-foreground">to continue to dimmasyusuf</p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="flex p-5 shadow-none"
            onMouseOver={() => setGoogleHover(true)}
            onMouseLeave={() => setGoogleHover(false)}
            onClick={() => signIn('google')}
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
            onClick={() => signIn('github')}
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

        {variant === 'signin' && (
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(onSignIn)}
              className="space-y-4"
            >
              <FormField
                control={signInForm.control}
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
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-primary text-sm">
                      Password
                    </FormLabel>
                    <div className="relative flex w-full items-center">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className="shadow-none"
                          {...field}
                        />
                      </FormControl>
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
        )}

        {variant === 'signup' && (
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSignUp)}
              className="space-y-4"
            >
              <FormField
                control={signUpForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-primary text-sm">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
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
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-primary text-sm">
                      Password
                    </FormLabel>
                    <div className="relative flex w-full items-center">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className="shadow-none"
                          {...field}
                        />
                      </FormControl>
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
                {isSubmitting ? 'SIGNING UP...' : 'CONTINUE'}
              </Button>
            </form>
          </Form>
        )}
      </div>

      <div className="flex gap-1 items-center">
        <p className="text-sm text-muted-foreground">
          {variant === 'signin' ? 'No account?' : 'Have an account?'}
        </p>

        <span
          onClick={toggleVariant}
          className="text-sm text-primary hover:underline cursor-pointer"
        >
          {variant === 'signin' ? 'Sign up' : 'Sign in'}
        </span>
      </div>
    </section>
  );
}
