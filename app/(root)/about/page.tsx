import EducationList from '@/components/EducationList';
import ExperienceList from '@/components/ExperienceList';
import Skills from '@/components/Skills';

export default function AboutPage() {
  return (
    <main className="flex flex-col p-2 pb-4 sm:p-4 gap-4 max-w-screen-md mx-auto">
      <ExperienceList />
      <EducationList />
      <Skills />
    </main>
  );
}
