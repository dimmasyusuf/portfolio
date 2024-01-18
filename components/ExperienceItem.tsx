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
    <div className="flex flex-col gap-2 w-full p-4 border rounded-xl">
      <div className="relative flex justify-center items-center aspect-square rounded-md w-10 h-10 mt-1">
        <Image
          src={logo}
          alt={name}
          width={40}
          height={40}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm">{job}</p>
        <p className="text-sm text-muted-foreground">{`${startDate} - ${endDate}`}</p>
      </div>
    </div>
  );
}
