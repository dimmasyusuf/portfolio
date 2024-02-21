import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteMessage } from '@/lib/actions/message.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function GuestDeleteDialog({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMessageMutation } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex justify-between w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent items-center">
        Delete
        <TrashIcon className="w-4 h-4 text-muted-foreground" />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs sm:max-w-md rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete your
            message and remove your data from my servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center gap-2">
          <AlertDialogCancel className="mt-0 border-none bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteMessageMutation(id)}
            className="w-full"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
