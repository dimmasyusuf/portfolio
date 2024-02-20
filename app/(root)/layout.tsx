import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavbarMobile from '@/components/NavbarMobile';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="max-w-screen-md mx-auto sm:p-4">
        <Hero />
      </header>
      <NavbarMobile />
      {children}
      <footer className="p-4 mb-[68px] sm:mb-0 max-w-screen-md mx-auto">
        <Footer />
      </footer>
    </>
  );
}
