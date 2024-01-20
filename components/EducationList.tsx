import data from '@/lib/data';
import { Educations } from '@/types';
import EducationItem from './EducationItem';

export default function Education() {
  const educations = data.educations;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Education</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {educations.map((education: Educations) => (
          <EducationItem
            key={education.id}
            education={education}
          />
        ))}
      </div>
    </section>
  );
}
