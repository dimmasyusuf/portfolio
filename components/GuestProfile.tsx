import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { User } from '@/types';

export default function GuestProfile({ user }: { user?: User | null }) {
  const { theme } = useTheme();
  const avatar =
    theme === 'light'
      ? '/images/avatar_light.webp'
      : '/images/avatar_dark.webp';

  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-1">
        <Image
          src={user?.image || avatar}
          alt={user?.name || 'Guest'}
          width={40}
          height={40}
          className="rounded-md aspect-square object-cover"
        />
        <ChevronDownIcon className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex flex-col gap-4 dark:shadow-background"
      >
        <div className="flex flex-col overflow-hidden">
          <h3 className="font-bold truncate">{user?.name || 'Guest'}</h3>
          <h4 className="text-sm text-muted-foreground truncate">
            {user?.email || 'guest@mail.com'}
          </h4>
        </div>
        <Button
          className="w-full"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
