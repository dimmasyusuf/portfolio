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
    <div className="flex rounded-xl border bg-card text-card-foreground p-6">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col">
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-muted-foreground">{`${major}, ${startDate} - ${endDate}`}</p>
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
