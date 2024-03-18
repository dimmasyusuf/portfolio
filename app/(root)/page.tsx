import Hero from '@/components/Hero';
import ProjectList from '@/components/ProjectList';
import ExperienceList from '@/components/ExperienceList';

export default function Home() {
  return (
    <main className="flex flex-col gap-4 pb-4 sm:p-4 max-w-screen-md mx-auto">
      <Hero />
      <ExperienceList />
      <ProjectList />
    </main>
  );
}
