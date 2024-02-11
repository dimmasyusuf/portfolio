'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import data from '@/lib/data';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import AuthDialog from './AuthDialog';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/actions/user.action';
import { useSession } from 'next-auth/react';
import { Skeleton } from './ui/skeleton';
import AuthProfile from './AuthProfile';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const routes = data.routes;
  const pathName = usePathname();
  const { status } = useSession();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
    enabled: status === 'authenticated',
  });

  return (
    <nav className="flex justify-between items-center">
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SheetTrigger
          aria-label="Open Mobile Menu"
          className="flex sm:hidden hover:bg-accent hover:text-accent-foreground h-9 w-9 items-center justify-center rounded-md"
        >
          <HamburgerMenuIcon className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between"
        >
          <SheetHeader className="mt-6">
            <SheetDescription>
              <ul className="flex flex-col gap-6">
                {routes.map((route, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className={`${
                        pathName === route.path
                          ? 'font-bold text-primary'
                          : 'text-muted-foreground'
                      } w-full`}
                      onClick={() => setIsOpen(false)}
                      asChild
                    >
                      <Link href={route.path}>{route.name}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button
              size="lg"
              className="w-full"
              asChild
            >
              <Link
                href="https://www.linkedin.com/in/dimmasyusuf/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hire Me
              </Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className="sm:flex hidden items-center">
        <ul className="flex gap-2">
          {routes.map((route, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className={`${
                  pathName === route.path
                    ? 'font-bold'
                    : 'text-muted-foreground'
                }`}
                asChild
              >
                <Link href={route.path}>{route.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {userLoading ? (
        <Skeleton className="w-9 h-9 aspect-square rounded-md" />
      ) : (
        <>{user ? <AuthProfile user={user} /> : <AuthDialog />}</>
      )}
    </nav>
  );
}
