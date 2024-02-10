import Image from 'next/image';
import { useTheme } from 'next-themes';
import { formatDate } from '@/lib/utils';
import { Support } from '@/types';

export default function SupportItem({ support }: { support: Support }) {
  const { name, message, totalUnit, createdAt, user } = support;
  const { theme } = useTheme();
  const avatar =
    theme === 'light'
      ? '/images/avatar_light.webp'
      : '/images/avatar_dark.webp';

  return (
    <div className="flex flex-col gap-2 rounded-md p-4 border bg-background">
      <div className="flex gap-2 w-full">
        <Image
          src={user.image || avatar}
          alt={user.name || 'Guest'}
          width={40}
          height={40}
          className="rounded-md w-10 h-10 aspect-square"
        />

        <div className="flex flex-col w-full">
          <div className="flex gap-x-1 gap-y-0 items-center flex-wrap">
            <span className="text-sm font-semibold whitespace-nowrap">
              {name}
            </span>
            <span className="text-sm whitespace-nowrap">supports</span>
            <span className="flex gap-0.5 items-center text-sm font-semibold whitespace-nowrap">
              <Image
                src="/images/icon_coffee.png"
                alt="Coffee"
                width={16}
                height={16}
              />
              {totalUnit} {totalUnit > 1 ? 'Cups' : 'Cup'}
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
