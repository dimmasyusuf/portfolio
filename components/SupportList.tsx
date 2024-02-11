'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllSupports } from '@/lib/actions/support.action';
import SupportItem from './SupportItem';
import { ScrollArea } from './ui/scroll-area';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';

export default function SupportList() {
  const { data: supports, isLoading: supportLoading } = useQuery({
    queryKey: ['support'],
    queryFn: () => getAllSupports(),
  });

  return (
    <ScrollArea className="h-[586px] sm:h-[569px] w-full border p-4 rounded-md bg-card dark:bg-accent">
      <div className="flex flex-col gap-4">
        {supportLoading &&
          Array.from({ length: 4 })?.map((_, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 rounded-md border bg-background"
            >
              <div className="flex gap-2 w-full">
                <Skeleton className="w-10 h-10 rounded-md aspect-square" />
                <div className="flex flex-col w-full gap-2 mt-1">
                  <Skeleton className="w-3/4 h-3 rounded-sm" />
                  <Skeleton className="w-1/4 h-2 rounded-sm" />
                </div>
              </div>
              <Skeleton className="w-3/3 h-3 rounded-sm" />
              <Skeleton className="w-2/3 h-3 rounded-sm" />
            </div>
          ))}

        {supports?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 h-[552px] sm:h-[535px]">
            <Image
              src="/images/icon_supportnotfound.webp"
              width={128}
              height={128}
              alt="Sleepy Icon"
              className="w-32 h-32"
            />
            <span className="text-lg">No supports found.</span>
          </div>
        ) : (
          supports?.map((support) => (
            <SupportItem
              key={support.id}
              support={support}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
}
