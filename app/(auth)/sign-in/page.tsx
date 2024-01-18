import SignInForm from '@/components/SignInForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/guestbook');

  return (
    <main className="flex items-center justify-center w-full h-[100dvh]">
      <SignInForm />
    </main>
  );
}
