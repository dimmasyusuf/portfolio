import SignUpForm from '@/components/SignUpForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/guestbook');

  return (
    <main className="flex items-center justify-center w-full h-[100dvh]">
      <SignUpForm />
    </main>
  );
}
