import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectList from '@/components/ProjectList';
import SocialMedia from '@/components/SocialMedia';
import Copyright from '@/components/Copyright';
import Skills from '@/components/Skills';
import Spotify from '@/components/Spotify';

export default function Home() {
  return (
    <>
      <header className="p-4 mb-4">
        <Navbar />
      </header>
      <main className="flex flex-col gap-10 p-4 w-full mb-4">
        <Hero />
        <ProjectList />
        <Skills />
      </main>
      <footer className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Spotify />
          <SocialMedia />
        </div>
        <Copyright />
      </footer>
    </>
  );
}
