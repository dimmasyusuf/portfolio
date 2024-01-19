'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import ProjectItem from './ProjectItem';
import data from '@/lib/data';
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ProjectList() {
  const pathName = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const initialPage = params.get('page') ? parseInt(params.get('page')!) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const projects = data.projects;
  const featuredProjects = data.projects.slice(0, 4);

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('page', newPage.toString());

    const queryString = newParams.toString();
    const url = queryString ? `${pathName}?${queryString}` : pathName;

    router.push(url);

    setCurrentPage(newPage);
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Projects</h3>
        {pathName === '/' ? (
          <Button
            size="sm"
            asChild
          >
            <Link href="/projects">
              View All
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            size="sm"
            asChild
          >
            <Link href="https://github.com/dimmasyusuf/">
              GitHub
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      <div className={`${pathName === '/projects' && 'min-h-[602px]'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-fit">
          {pathName === '/'
            ? featuredProjects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                />
              ))
            : currentProjects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                />
              ))}
        </div>
      </div>
      {pathName === '/projects' && (
        <nav
          role="navigation"
          aria-label="pagination"
          className="mx-auto flex w-full justify-center"
        >
          <ul className="flex flex-row items-center gap-1">
            <li>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="ghost"
                size="icon"
                aria-label="Previous page"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            </li>

            {generatePageNumbers().map((pageNumber) => (
              <li key={pageNumber}>
                <Button
                  onClick={() => handlePageChange(pageNumber)}
                  variant="ghost"
                  size="icon"
                  aria-label={`Page ${pageNumber}`}
                  className={
                    params.toString() === `page=${pageNumber}`
                      ? 'font-bold bg-accent'
                      : ''
                  }
                >
                  {pageNumber}
                </Button>
              </li>
            ))}

            <li>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === generatePageNumbers().length}
                variant="ghost"
                size="icon"
                aria-label="Next page"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </section>
  );
}
