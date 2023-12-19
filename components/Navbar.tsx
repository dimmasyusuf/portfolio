import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { CodeIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import data from '@/data';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const routes = data.routes;

  return (
    <nav className="flex justify-between items-center">
      <Sheet>
        <SheetTrigger className="flex sm:hidden hover:bg-accent hover:text-accent-foreground h-9 w-9 items-center justify-center rounded-md">
          <HamburgerMenuIcon className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between"
        >
          <SheetHeader className="mt-6">
            <SheetDescription>
              <ul className="flex flex-col gap-6">
                {routes.map((route, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full"
                      asChild
                    >
                      <Link
                        href={route.path}
                        className="text-black dark:text-white"
                      >
                        {route.name}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button
              size="lg"
              asChild
            >
              <Link href="https://www.linkedin.com/in/dimmasyusuf/">
                Hire Me
              </Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Link
        href="/"
        className="hidden sm:flex"
      >
        <CodeIcon className="w-9 h-9" />
      </Link>
      <div className="sm:flex hidden gap-4 items-center">
        <ul className="flex gap-2">
          {routes.map((route, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                asChild
              >
                <Link href={route.path}>{route.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
      <div className="flex sm:hidden">
        <ThemeToggle />
      </div>
    </nav>
  );
}
