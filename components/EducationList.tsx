import data from '@/lib/data';
import { Education } from '@/types';
import EducationItem from './EducationItem';
import { Separator } from './ui/separator';

export default function Education() {
  const educations = data.educations;

  return (
    <section className="flex flex-col">
      <h3 className="text-2xl font-bold">Education</h3>
      <Separator className="my-4" />
      <div className="flex flex-col gap-4">
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
