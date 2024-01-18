import Hero from '@/components/Hero';
import ProjectList from '@/components/ProjectList';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <main className="flex flex-col gap-16 p-4 max-w-screen-md mx-auto">
      <Hero />
      <ProjectList />
      <Skills />
    </main>
  );
}
