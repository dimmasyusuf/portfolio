import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { formatDate, getInitials } from '@/lib/utils';
import { Support } from '@/types';

export default function SupportItem({ support }: { support: Support }) {
  const {
    name,
    message,
    totalCoffee,
    createdAt,
    payment: { user },
  } = support;

  return (
    <div className="flex flex-col gap-2 rounded-md p-4 border bg-background dark:bg-accent">
      <div className="flex gap-2 w-full">
        <Avatar className="rounded-md w-10 h-10 aspect-square">
          <AvatarImage
            src={user?.image!}
            width={40}
            height={40}
            alt={user?.name!}
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
            <span className="text-sm whitespace-nowrap">supports</span>
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
  );
}
