import Image from 'next/image';
import { Button } from './ui/button';
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

export default function GuestItem() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between gap-4">
        <div className="flex gap-2 w-full">
          <div className="relative flex items-center justify-center w-10 h-10 aspect-square">
            <Image
              src="/profile.webp"
              alt="profile"
              fill
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center gap-1">
              <p className="font-bold text-sm">Dimas Yusuf</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
            <p className="text-xs">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              laudantium quis dolor optio facere tenetur
            </p>
          </div>
        </div>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="flex items-center justify-center hover:bg-accent h-7 px-0.5">
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
      </div>
      <Separator />
    </div>
  );
}
