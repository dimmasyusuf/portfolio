import ProjectList from '@/components/ProjectList';
import Footer from '@/components/Footer';

export default function ProjectPage() {
  return (
    <>
      <main className="flex flex-col p-4 w-full">
        <ProjectList />
      </main>
      <Footer />
    </>
  );
}
