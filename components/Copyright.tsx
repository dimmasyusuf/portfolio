import Link from 'next/link';

export default function Copyright() {
  const year = new Date().getFullYear() as number;

  return (
    <div className="flex justify-center items-center p-4">
      <p className="text-xs text-muted-foreground">
        &copy; {year}{' '}
        <Link
          href="https://www.linkedin.com/in/dimmasyusuf/"
          className="hover:text-primary"
          target="_blank"
        >
          dimmasyusuf
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
}
