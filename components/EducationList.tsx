import data from '@/lib/data';
import { Educations } from '@/types';
import EducationItem from './EducationItem';

export default function Education() {
  const educations = data.educations;

  return (
    <section className="flex flex-col bg-background border rounded-md">
      <span className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg sm:text-xl font-bold">Education</h2>
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
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
