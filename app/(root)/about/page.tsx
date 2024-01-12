import EducationList from '@/components/EducationList';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex p-4 w-full">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">About</h3>
          <Button
            size="sm"
            asChild
          >
            <Link
              href="https://www.linkedin.com/in/dimmasyusuf/"
              target="_blank"
            >
              LinkedIn
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <EducationList />
      </div>
    </main>
  );
}
