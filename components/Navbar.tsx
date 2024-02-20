'use client';

import Link from 'next/link';
import data from '@/lib/data';
import { usePathname } from 'next/navigation';
import AuthDialog from './AuthDialog';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/actions/user.action';
import { useSession } from 'next-auth/react';
import { Skeleton } from './ui/skeleton';
import AuthProfile from './AuthProfile';

export default function Navbar() {
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
      <ul className="hidden sm:flex gap-8 items-center w-full">
        {routes.map((route, index) => (
          <li key={index}>
            <Link
              href={route.path}
              className={`${
                pathName === route.path ? 'font-bold' : 'text-muted-foreground'
              } text-sm hover:font-bold hover:text-primary transition-all ease-in-out duration-3000`}
            >
              {route.name}
            </Link>
          </li>
        ))}
        <li className="ml-auto">
          {userLoading ? (
            <Skeleton className="w-9 h-9 aspect-square rounded-md" />
          ) : (
            <>{user ? <AuthProfile user={user} /> : <AuthDialog />}</>
          )}
        </li>
      </ul>
    </nav>
  );
}
