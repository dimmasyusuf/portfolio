import { CookieIcon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import data from '@/data';

export default function Skills() {
  const frontends = data.frontend;
  const backends = data.backend;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Skills</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col p-6 gap-4 border rounded-xl shadow bg-card text-card-foreground">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-xl">Frontend</h4>
            <CookieIcon className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {frontends.map((frontend) => (
              <Button
                key={frontend.id}
                asChild
              >
                <a
                  href={frontend.href}
                  target="_blank"
                >
                  {frontend.name}
                </a>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-6 gap-4 border rounded-xl shadow bg-card text-card-foreground">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-xl">Backend</h4>
            <RocketIcon className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {backends.map((backend) => (
              <Button
                key={backend.id}
                asChild
              >
                <a
                  href={backend.href}
                  target="_blank"
                >
                  {backend.name}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
