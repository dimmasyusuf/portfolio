import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-background fixed overflow-hidden border-t sm:border-none sm:static bottom-0 w-full shadow-sm sm:shadow-none p-4 z-10 max-w-screen-md mx-auto">
        <Navbar />
      </header>
      {children}
      <footer className="px-2 py-4 sm:px-4 mb-[68px] sm:mb-0 max-w-screen-md mx-auto">
        <Footer />
      </footer>
    </>
  );
}
