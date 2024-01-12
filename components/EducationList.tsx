import data from '@/lib/data';
import { Education } from '@/types';
import EducationItem from './EducationItem';
import { BackpackIcon } from '@radix-ui/react-icons';

export default function Education() {
  const educations = data.educations;

  return (
    <div className="flex flex-col gap-4">
      {educations.map((education: Education) => (
        <EducationItem
          key={education.id}
          {...education}
        />
      ))}
    </div>
  );
}
