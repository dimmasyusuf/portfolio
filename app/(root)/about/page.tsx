import EducationList from '@/components/EducationList';
import ExperienceList from '@/components/ExperienceList';
import Skills from '@/components/Skills';

export default function AboutPage() {
  return (
    <main className="flex flex-col p-4 gap-8 w-full">
      <ExperienceList />
      <EducationList />
      <Skills />
    </main>
  );
}
