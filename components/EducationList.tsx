import data from '@/lib/data';
import { Education } from '@/types';
import EducationItem from './EducationItem';

export default function Education() {
  const educations = data.educations;

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-xl font-bold">Education</h4>
      <div className="flex flex-col gap-4">
        {educations.map((education: Education) => (
          <EducationItem
            key={education.id}
            {...education}
          />
        ))}
      </div>
    </div>
  );
}
