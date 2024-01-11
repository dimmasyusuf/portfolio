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

export default function ProjectItem({
  name,
  description,
  year,
  demo,
  code,
}: Projects) {
  return (
    <Card className="shadow-none hover:shadow-sm">
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
          <Link href={demo}>
            <ExternalLinkIcon className="mr-2 h-4 w-4" /> Demo
          </Link>
        </Button>
        <Button
          size="sm"
          asChild
        >
          <Link
            href={code}
            className="flex items-center"
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
