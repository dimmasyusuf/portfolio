import Copyright from '@/components/Copyright';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import SocialMedia from '@/components/SocialMedia';

export default function Home() {
  return (
    <>
      <header className="p-4 shadow-sm mb-4">
        <Navbar />
      </header>
      <main className="flex w-full">
        <Hero />
      </main>
      <footer className="flex flex-col gap-4 p-4">
        <SocialMedia />
        <Copyright />
      </footer>
    </>
  );
}
