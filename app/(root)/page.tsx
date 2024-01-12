import Hero from '@/components/Hero';
import ProjectList from '@/components/ProjectList';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col gap-16 p-4 w-full">
      <Hero />
      <ProjectList />
      <Skills />
    </main>
  );
}
