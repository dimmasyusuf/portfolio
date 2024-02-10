import * as z from 'zod';

export const signInFormSchema = z.object({
  email: z.string().email({
    message: 'Email address must be a valid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Your password must contain 8 or more characters.',
    })
    .max(72, {
      message: 'Your password must contain less than 72 characters.',
    }),
});

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Name must be between 4 and 64 characters long.',
    })
    .max(64, {
      message: 'Name must be between 4 and 64 characters long.',
    }),
  email: z.string().email({
    message: 'Email address must be a valid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Your password must contain 8 or more characters.',
    })
    .max(72, {
      message: 'Your password must contain less than 72 characters.',
    }),
});

export const guestInputSchema = z.object({
  message: z
    .string()
    .min(1, {
      message: 'Message must be at least 1 character long.',
    })
    .max(280, {
      message: 'Message must be less than 280 characters long.',
    }),
});

export const supportInputSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Name must be between 4 and 64 characters long.',
    })
    .max(64, {
      message: 'Name must be between 4 and 64 characters long.',
    }),
  message: z
    .string()
    .min(1, {
      message: 'Message must be at least 1 character long.',
    })
    .max(280, {
      message: 'Message must be less than 280 characters long.',
    }),
});
