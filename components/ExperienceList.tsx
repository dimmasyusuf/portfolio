import data from '@/lib/data';
import { Experience } from '@/types';
import ExperienceItem from './ExperienceItem';
import { Separator } from './ui/separator';

export default function ExperienceList() {
  const experiences = data.experiences;

  return (
    <section className="flex flex-col">
      <h3 className="text-2xl font-bold">Experience</h3>
      <Separator className="my-4" />
      <div className="flex flex-col gap-4">
        {experiences.map((experience: Experience) => (
          <ExperienceItem
            key={experience.id}
            {...experience}
          />
        ))}
      </div>
    </section>
  );
}
