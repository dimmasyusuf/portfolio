import { Experiences } from '@/types';
import Image from 'next/image';

export default function ExperienceItem({
  experience,
}: {
  experience: Experiences;
}) {
  const { title, company, startDate, endDate, logoUrl } = experience;

  return (
    <div className="flex flex-col gap-2 w-full p-6 border rounded-md bg-card">
      <div className="relative flex justify-center items-center aspect-square rounded-md w-10 h-10 mt-1">
        <Image
          src={logoUrl}
          alt={company}
          width={40}
          height={40}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold">{company}</h3>
        <h4 className="text-sm">{title}</h4>
        <p className="text-sm text-muted-foreground">{`${startDate} - ${endDate}`}</p>
      </div>
    </div>
  );
}
