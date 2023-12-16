import Link from 'next/link';
import { Button } from './ui/button';
import ProjectItem from './ProjectItem';

export default function Projects() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Projects</h3>
        <Button asChild>
          <Link href="/projects">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
      </div>
    </div>
  );
}
