import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export const formatDate = (date: Date) => {
  return moment(date).fromNow();
};

export const getInitials = (name: string) => {
  const parts = name.split(' ');
  let initials = '';

  for (let i = 0; i < Math.min(2, parts.length); i++) {
    initials += parts[i].charAt(0).toUpperCase();
  }

  return initials;
};

export const obfuscateEmail = (email: string) => {
  const [username, domain] = email.split('@');
  const obfuscatedUsername =
    username.charAt(0) + '*'.repeat(5) + username.charAt(username.length - 1);
  return obfuscatedUsername + '@' + domain;
};

export const splitFullName = (fullName: string) => {
  const space = fullName.indexOf(' ');
  const first_name = space === -1 ? fullName : fullName.slice(0, space);
  const last_name = space === -1 ? '' : fullName.slice(space + 1);

  return { first_name, last_name };
};
