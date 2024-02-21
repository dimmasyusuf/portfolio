import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { Projects } from '@/types';

export default function ProjectItem({ project }: { project: Projects }) {
  const { name, description, year, demoUrl, repoUrl } = project;

  return (
    <Card className="shadow-none rounded-md h-fit">
      <CardHeader>
        <p className="text-sm">{year}</p>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-md">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2 items-center">
        <Button
          size="sm"
          asChild
        >
          <Link
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLinkIcon className="mr-2 h-4 w-4" /> Demo
          </Link>
        </Button>
        <Button
          size="sm"
          asChild
        >
          <Link
            href={repoUrl}
            className="flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
