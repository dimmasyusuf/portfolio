import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import AuthForm from './AuthForm';
import { Dispatch, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AuthDialog({
  showAuth,
  setShowAuth,
}: {
  showAuth?: boolean;
  setShowAuth?: Dispatch<boolean>;
}) {
  const [isOpen, setIsOpen] = useState(false || showAuth);
  const pathName = usePathname();

  if (!isOpen && setShowAuth) setShowAuth(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      {pathName === '/support' && (
        <DialogTrigger className="ml-auto bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors">
          Next <ArrowRightIcon className="ml-2 w-4 h-4" />
        </DialogTrigger>
      )}
      {pathName === '/guestbook' && (
        <DialogTrigger className="ml-auto bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors">
          Sign in
        </DialogTrigger>
      )}
      <DialogContent className="flex items-center justify-center h-[100dvh] sm:h-fit w-full sm:w-fit p-0 overflow-auto">
        <AuthForm openAuth={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
