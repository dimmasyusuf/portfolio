'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllSupports } from '@/lib/actions/support.action';
import SupportItem from './SupportItem';
import { ScrollArea } from './ui/scroll-area';

export default function SupportList() {
  const { data: supports } = useQuery({
    queryKey: ['support'],
    queryFn: () => getAllSupports(),
  });

  return (
    <ScrollArea className="h-[586px] sm:h-[569px] w-full border p-4 rounded-md bg-card dark:bg-accent">
      <div className="flex flex-col gap-4">
        {supports?.length === 0 || !supports ? (
          <div className="flex flex-col items-center justify-center gap-2 h-[552px] sm:h-[535px]">
            <span className="text-9xl">🥺</span>
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
