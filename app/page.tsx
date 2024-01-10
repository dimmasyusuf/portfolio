import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectList from '@/components/ProjectList';
import FooterList from '@/components/SocialMedia';
import Copyright from '@/components/Copyright';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <>
      <header className="p-4 shadow-sm mb-4">
        <Navbar />
      </header>
      <main className="flex flex-col gap-10 p-4 w-full mb-4">
        <Hero />
        <ProjectList />
        <Skills />
      </main>
      <footer className="flex flex-col gap-4 p-4">
        <FooterList />
        <Copyright />
      </footer>
    </>
  );
}
