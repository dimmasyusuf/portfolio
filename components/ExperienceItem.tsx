import { Experience } from '@/types';
import parse from 'html-react-parser';
import Image from 'next/image';

export default function ExperienceItem({
  name,
  job,
  startDate,
  endDate,
  description,
  logo,
}: Experience) {
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
          <p className="text-sm">{job}</p>
          <p className="text-sm text-muted-foreground">{`${startDate} - ${endDate}`}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm">{parse(description)}</p>
        </div>
      </div>
    </div>
  );
}
