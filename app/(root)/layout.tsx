import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-background sticky sm:static top-0 w-full shadow-sm sm:shadow-none p-4 mb-4 z-10 max-w-screen-md mx-auto">
        <Navbar />
      </header>
      {children}
      <footer className="p-4 max-w-screen-md mx-auto">
        <Footer />
      </footer>
    </>
  );
}
