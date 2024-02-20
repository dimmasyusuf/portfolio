'use client';

import { CookieIcon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import data from '@/lib/data';
import { usePathname } from 'next/navigation';

export default function Skills() {
  const frontends = data.frontends;
  const backends = data.backends;
  const pathName = usePathname();

  return (
    <section className="flex flex-col gap-6 mx-4 sm:mx-0">
      {pathName === '/about' && <h2 className="text-2xl font-bold">Skills</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col p-6 gap-4 border rounded-md bg-card dark:bg-accent">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl">Frontend</h3>
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
                  href={frontend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {frontend.name}
                </a>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-6 gap-4 border rounded-xl bg-card dark:bg-accent">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl">Backend</h3>
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
                  href={backend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {backend.name}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
