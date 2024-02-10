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
        {supports?.map((support) => (
          <SupportItem
            key={support.id}
            support={support}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
