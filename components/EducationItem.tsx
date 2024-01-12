import { Education } from '@/types';
import Image from 'next/image';
import parse from 'html-react-parser';

export default function EducationItem({
  name,
  major,
  startDate,
  endDate,
  location,
  description,
  logo,
  grade,
  activities,
}: Education) {
  return (
    <div className="flex gap-4">
      <div className="relative flex items-center justify-center w-12 h-12 aspect-square">
        <Image
          src={logo}
          alt={name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col">
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm">{major}</p>
          <p className="text-sm text-muted-foreground">{`${startDate} - ${endDate}`}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        <div className="flex flex-col">
          {grade && <p className="text-sm">{`Grade: ${grade}`}</p>}
          {activities && (
            <p className="text-sm">{`Activities and societies: ${activities}`}</p>
          )}
          {description && <p className="text-sm">{parse(description)}</p>}
        </div>
      </div>
    </div>
  );
}
