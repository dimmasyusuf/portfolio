'use client';

import { CookieIcon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import data from '@/lib/data';
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';

export default function Skills() {
  const frontends = data.frontend;
  const backends = data.backend;
  const pathName = usePathname();

  return (
    <div className={`${pathName !== '/about' && 'gap-6'} flex flex-col`}>
      <h3 className="text-2xl font-bold">Skills</h3>
      {pathName === '/about' && <Separator className="my-4" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col p-6 gap-4 border rounded-xl bg-card text-card-foreground">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-xl">Frontend</h4>
            <CookieIcon className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {frontends.map((frontend) => (
              <Button
                key={frontend.id}
                size="sm"
                asChild
              >
                <a
                  href={frontend.href}
                  target="_blank"
                >
                  {frontend.name}
                </a>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-6 gap-4 border rounded-xl bg-card text-card-foreground">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-xl">Backend</h4>
            <RocketIcon className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {backends.map((backend) => (
              <Button
                key={backend.id}
                size="sm"
                asChild
              >
                <a
                  href={backend.href}
                  target="_blank"
                >
                  {backend.name}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
