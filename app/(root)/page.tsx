import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import ProjectList from '@/components/ProjectList';

export default function Home() {
  return (
    <main className="flex flex-col gap-4 pb-4 sm:p-4 max-w-screen-md mx-auto">
      <Hero />
      <Skills />
      <ProjectList />
    </main>
  );
}
