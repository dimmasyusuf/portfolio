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

export default function ProjectItem() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Talktiv</CardTitle>
        <CardDescription className="text-md">
          A social media platform for developers.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2 items-center">
        <Button asChild>
          <Link href="">
            <ExternalLinkIcon className="mr-2 h-4 w-4" /> Demo
          </Link>
        </Button>
        <Button asChild>
          <Link
            href=""
            className="flex items-center"
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
