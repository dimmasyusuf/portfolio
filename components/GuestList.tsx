import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import GuestItem from './GuestItem';

export default function GuestList() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-2xl">Guestbook</h3>
        <Button>Sign in</Button>
      </div>
      <ScrollArea className="w-full h-[565px] border p-4 rounded-md">
        <div className="flex flex-col gap-4">
          <GuestItem />
        </div>
      </ScrollArea>
    </section>
  );
}
