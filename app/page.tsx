import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <header className="p-4 shadow-sm mb-4">
        <Navbar />
      </header>
      <main className="flex w-full">
        <Hero />
      </main>
      <footer></footer>
    </>
  );
}
