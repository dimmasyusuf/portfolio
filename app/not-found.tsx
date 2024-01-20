'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="flex items-center justify-center w-full h-[100dvh]">
      <section className="grid grid-cols-1 sm:grid-cols-2 max-w-screen-md p-6 gap-8 items-end">
        <div className="flex flex-col order-2 sm:order-1 gap-4 justify-end p-6 rounded-md h-fit">
          <div className="flex gap-4 h-12 items-center">
            <h1 className="font-bold text-5xl">404</h1>
            <Separator orientation="vertical" />
            <div className="flex flex-col w-full">
              <p className="whitespace-nowrap">Oops...</p>
              <p className="whitespace-nowrap">page not found</p>
            </div>
          </div>

          <Button
            asChild
            className="w-full"
          >
            <Link href="/">Back Home</Link>
          </Button>
        </div>

        <Image
          src="/images/icon_duck.webp"
          alt="duck"
          width={384}
          height={384}
          className="order-1 sm:order-2"
        />
      </section>
    </main>
  );
}
