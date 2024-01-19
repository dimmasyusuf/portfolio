import data from '@/lib/data';
import ExperienceItem from './ExperienceItem';

export default function ExperienceList() {
  const experiences = data.experiences;

  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-2xl font-bold">Experience</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {experiences.map((experience) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
          />
        ))}
      </div>
    </section>
  );
}
