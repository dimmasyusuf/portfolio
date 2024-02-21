'use client';

import { CookieIcon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import data from '@/lib/data';
import Link from 'next/link';

export default function Skills() {
  const skills = data.skills;

  return (
    <section className="flex flex-col mx-4 sm:mx-0 bg-background border sm:border rounded-md sm:rounded-md">
      <span className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg sm:text-xl font-bold text-primary">Skills</h2>
        <RocketIcon className="w-4 h-4" />
      </span>

      <div className="flex items-center flex-wrap gap-2 p-4">
        {skills.map((skill) => (
          <Button
            key={skill.id}
            size="sm"
            asChild
          >
            <Link
              href={skill?.url!}
              target="_blank"
              rel="noopener noreferrer"
            >
              {skill.name}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
