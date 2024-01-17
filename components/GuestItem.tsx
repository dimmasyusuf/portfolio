import Image from 'next/image';
import {
  DotsVerticalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { Separator } from './ui/separator';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Message, User } from '@/types';
import { useTheme } from 'next-themes';
import moment from 'moment';
import { deleteMessage } from '@/lib/actions/message.action';

export default function GuestItem({
  message,
  user,
}: {
  message: Message;
  user?: User | null;
}) {
  const { text, createdAt, author } = message;

  const { theme } = useTheme();
  const avatar =
    theme === 'light' ? '/images/avatar_light.png' : '/images/avatar_dark.png';
  const formattedCreatedAt = moment(createdAt).fromNow();
  const authorEmail = author?.email;
  const sessionEmail = user?.email;
  const isAuthor = authorEmail === sessionEmail;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between gap-4">
        <div className="flex gap-2 w-full">
          <div className="relative flex items-center justify-center w-10 h-10 aspect-square">
            <Image
              src={author?.image || avatar}
              alt="profile"
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center gap-1">
              <p className="font-bold text-sm">{author?.name}</p>
              <p className="text-xs text-muted-foreground">
                {formattedCreatedAt}
              </p>
            </div>
            <p className="text-xs">{text}</p>
          </div>
        </div>

        {isAuthor && (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger
                aria-label="Open Options"
                className="flex items-center justify-center hover:bg-accent h-7 px-0.5"
              >
                <DotsVerticalIcon className="w-4 h-4" />
              </MenubarTrigger>
              <MenubarContent align="end">
                <MenubarItem>
                  Edit{' '}
                  <MenubarShortcut>
                    <Pencil2Icon className="w-4 h-4" />
                  </MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Delete{' '}
                  <MenubarShortcut>
                    <TrashIcon className="w-4 h-4" />
                  </MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>
      <Separator />
    </div>
  );
}
