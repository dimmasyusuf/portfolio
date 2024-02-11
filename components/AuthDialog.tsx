import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EnterIcon } from '@radix-ui/react-icons';
import AuthForm from './AuthForm';
import { Dispatch, useState } from 'react';

export default function AuthDialog({
  showAuth,
  setShowAuth,
}: {
  showAuth?: boolean;
  setShowAuth?: Dispatch<boolean>;
}) {
  const [isOpen, setIsOpen] = useState(false || showAuth);

  if (!isOpen && setShowAuth) setShowAuth(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger className="ml-auto flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground">
        <EnterIcon className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center h-[100dvh] sm:h-fit w-full sm:w-fit p-0 overflow-auto">
        <AuthForm openAuth={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
