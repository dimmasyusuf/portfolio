import data from '@/lib/data';
import { Education } from '@/types';
import EducationItem from './EducationItem';

export default function Education() {
  const educations = data.educations;

  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-2xl font-bold">Education</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {educations.map((education: Education) => (
          <EducationItem
            key={education.id}
            {...education}
          />
        ))}
      </div>
    </section>
  );
}
