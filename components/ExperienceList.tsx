import data from '@/lib/data';
import ExperienceItem from './ExperienceItem';

export default function ExperienceList() {
  const experiences = data.experiences;

  return (
    <section className="flex flex-col bg-background border rounded-md">
      <span className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg sm:text-xl font-bold">Experience</h2>
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
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
