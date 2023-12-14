import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet';
import { Button, buttonVariants } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import data from '@/data';

export default function Navbar() {
  const routes = data.routes;

  return (
    <nav className="flex justify-between items-center">
      <h1 className="font-bold text-xl">dimmasyusuf</h1>
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
        <Button asChild>
          <Link href="https://www.linkedin.com/in/dimmasyusuf/">Hire Me</Link>
        </Button>
      </div>
      <Sheet>
        <SheetTrigger className="flex sm:hidden">
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
                        className="text-black"
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
    </nav>
  );
}
