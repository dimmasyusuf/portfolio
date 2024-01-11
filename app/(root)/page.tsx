import Hero from '@/components/Hero';
import ProjectList from '@/components/ProjectList';
import SocialMedia from '@/components/SocialMedia';
import Copyright from '@/components/Copyright';
import Skills from '@/components/Skills';
import Spotify from '@/components/Spotify';

export default function Home() {
  return (
    <>
      <main className="flex flex-col w- p-4 w-full">
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
