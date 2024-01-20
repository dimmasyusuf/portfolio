import { Skills, Projects, Routes, Educations, Experiences } from '@/types';

const data = (() => {
  const routes: Routes[] = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'Projects',
      path: '/projects',
    },
    {
      id: 3,
      name: 'About',
      path: '/about',
    },
    {
      id: 4,
      name: 'Guestbook',
      path: '/guestbook',
    },
  ];

  const projects: Projects[] = [
    {
      id: 1,
      name: 'Acara',
      description: 'Event management app.',
      year: 2024,
      demoUrl: 'https://acaramu.vercel.app/',
      repoUrl: 'https://github.com/dimmasyusuf/acara',
    },
    {
      id: 2,
      name: 'Talktiv',
      description: 'A social media app for developers.',
      year: 2023,
      demoUrl: 'https://talktiv.vercel.app/',
      repoUrl: 'https://github.com/dimmasyusuf/talktiv',
    },
    {
      id: 3,
      name: 'Dicatat',
      description: 'A note-taking app.',
      year: 2022,
      demoUrl: 'https://dicatat.vercel.app/',
      repoUrl: 'https://github.com/dimmasyusuf/dicatat',
    },
    {
      id: 4,
      name: 'Food House',
      description: 'Explore best restaurants near you.',
      year: 2022,
      demoUrl: 'https://food-house.vercel.app/',
      repoUrl: 'https://github.com/dimmasyusuf/food-house',
    },
    {
      id: 5,
      name: 'Noteable',
      description: 'A note-taking app.',
      year: 2022,
      demoUrl: 'https://noteable.vercel.app/',
      repoUrl: 'https://github.com/dimmasyusuf/noteable',
    },
    {
      id: 6,
      name: 'repo-finder',
      description: 'A GitHub repository finder.',
      year: 2022,
      demoUrl: 'https://repo-finder.vercel.app/',
      repoUrl: 'https://github.com/dimmasyusuf/repo-finder',
    },
    {
      id: 7,
      name: 'Reading Room',
      description: 'Book tracking app.',
      year: 2022,
      demoUrl: 'https://reading-room.vercel.app/',
      repoUrl: 'https://github.com/dimmasyusuf/bookshelf-apps',
    },
    {
      id: 8,
      name: 'NFTopia',
      description: 'A marketplace for NFTs.',
      year: 2022,
      demoUrl: 'https://nftopia.vercel.app/',
      repoUrl: 'https://github.com/dimmasyusuf/nftopia',
    },
  ];

  const frontends: Skills[] = [
    {
      id: 1,
      name: 'HTML',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      id: 2,
      name: 'CSS',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      id: 3,
      name: 'JavaScript',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      id: 4,
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org/',
    },
    {
      id: 5,
      name: 'React',
      url: 'https://react.dev/',
    },
    {
      id: 6,
      name: 'Next.js',
      url: 'https://nextjs.org/',
    },
    {
      id: 7,
      name: 'Tailwind CSS',
      url: 'https://tailwindcss.com/',
    },
    {
      id: 8,
      name: 'Chakra UI',
      url: 'https://chakra-ui.com/',
    },
    {
      id: 9,
      name: 'Shadcn UI',
      url: 'https://ui.shadcn.com/',
    },
    {
      id: 10,
      name: 'Redux',
      url: 'https://redux.js.org/',
    },
    {
      id: 11,
      name: 'React Query',
      url: 'https://react-query.tanstack.com/',
    },
    {
      id: 12,
      name: 'Storybook',
      url: 'https://storybook.js.org/',
    },
    {
      id: 13,
      name: 'Jest',
      url: 'https://jestjs.io/',
    },
    {
      id: 14,
      name: 'Cypress',
      url: 'https://www.cypress.io/',
    },
  ];

  const backends: Skills[] = [
    {
      id: 1,
      name: 'Node.js',
      url: 'https://nodejs.org/en/',
    },
    {
      id: 2,
      name: 'Express',
      url: 'https://expressjs.com/',
    },
    {
      id: 3,
      name: 'MongoDB',
      url: 'https://www.mongodb.com/',
    },
    {
      id: 4,
      name: 'Prisma',
      url: 'https://www.prisma.io/',
    },
    {
      id: 5,
      name: 'MySQL',
      url: 'https://www.mysql.com/',
    },
    {
      id: 6,
      name: 'Sequelize',
      url: 'https://sequelize.org/',
    },
    {
      id: 7,
      name: 'Firebase',
      url: 'https://firebase.google.com/',
    },
    {
      id: 8,
      name: 'Supabase',
      url: 'https://supabase.io/',
    },
  ];

  const educations: Educations[] = [
    {
      id: 1,
      university: 'Trisakti Institute of Transportation and Logistics',
      major: 'Aerospace Engineering',
      startDate: '2019',
      endDate: '2023',
      logoUrl: '/images/logo_itl_trisakti.webp',
    },
  ];

  const experiences: Experiences[] = [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'Upwork',
      startDate: 'Jan 2024',
      endDate: 'Present',
      logoUrl: '/images/logo_upwork.webp',
    },
    {
      id: 1,
      title: 'Full Stack Developer Student',
      company: 'Purwadhika Digital Technology School',
      startDate: 'Jul 2023',
      endDate: 'Dec 2023',
      logoUrl: '/images/logo_purwadhika.webp',
    },
    {
      id: 2,
      title: 'Frontend Developer Student',
      company: 'Dicoding Indonesia',
      startDate: 'Aug 2022',
      endDate: 'Jan 2023',
      logoUrl: '/images/logo_dicoding.webp',
    },
  ];

  return {
    routes,
    projects,
    frontends,
    backends,
    educations,
    experiences,
  };
})();

export default data;
