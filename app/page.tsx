import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <header className="px-6 py-4">
        <Navbar />
      </header>
      <main className="flex justify-center items-center w-full h-screen">
        <Button>Click me</Button>
      </main>
      <footer></footer>
    </>
  );
}
