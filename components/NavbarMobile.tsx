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
import {
  RiBox3Fill,
  RiBox3Line,
  RiChat3Fill,
  RiChat3Line,
  RiHeart3Fill,
  RiHeart3Line,
  RiHomeFill,
  RiHomeLine,
  RiUser3Fill,
  RiUser3Line,
} from 'react-icons/ri';
import { RouteIcon } from '@/types';

export default function NavbarMobile() {
  const routes = data.routes;
  const pathName = usePathname();
  const { status } = useSession();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
    enabled: status === 'authenticated',
  });

  return (
    <nav className="flex justify-between items-center fixed sm:hidden overflow-hidden bg-background border-t bottom-0 w-full p-4 z-10">
      <ul className="grid grid-cols-6 sm:hidden w-full">
        {routes.map((route, index) => {
          const isActiveRoute = pathName === route.path;
          const icon: RouteIcon = {
            Home: isActiveRoute ? (
              <RiHomeFill className="w-6 h-6" />
            ) : (
              <RiHomeLine className="w-6 h-6" />
            ),
            Projects: isActiveRoute ? (
              <RiBox3Fill className="w-6 h-6" />
            ) : (
              <RiBox3Line className="w-6 h-6" />
            ),
            About: isActiveRoute ? (
              <RiUser3Fill className="w-6 h-6" />
            ) : (
              <RiUser3Line className="w-6 h-6" />
            ),
            Guestbook: isActiveRoute ? (
              <RiChat3Fill className="w-6 h-6" />
            ) : (
              <RiChat3Line className="w-6 h-6" />
            ),
            Support: isActiveRoute ? (
              <RiHeart3Fill className="w-6 h-6" />
            ) : (
              <RiHeart3Line className="w-6 h-6" />
            ),
          };

          return (
            <li
              key={index}
              className="flex items-center justify-center"
            >
              <Link
                href={route.path}
                className="flex flex-col items-center justify-center w-9 h-9 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground"
                aria-label={route.name}
              >
                {icon[route.name]}
              </Link>
            </li>
          );
        })}
        <li className="flex items-center justify-center">
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
