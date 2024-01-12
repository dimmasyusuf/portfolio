import { Education } from '@/types';
import Image from 'next/image';

export default function EducationItem({
  name,
  major,
  startDate,
  endDate,
  grade,
  activities,
  logo,
}: Education) {
  return (
    <div className="flex gap-4">
      <div className="relative flex justify-center items-center aspect-square rounded-md w-10 h-10 mt-1">
        <Image
          src={logo}
          alt={name}
          fill
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col">
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm">{major}</p>
          <p className="text-sm text-muted-foreground">{`${startDate} - ${endDate}`}</p>
        </div>
        <div className="flex flex-col">
          {grade && <p className="text-sm">{`Grade: ${grade}`}</p>}
          {activities && (
            <p className="text-sm">{`Activities and societies: ${activities}`}</p>
          )}
        </div>
      </div>
    </div>
  );
}
