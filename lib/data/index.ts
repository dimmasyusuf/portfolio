import { Skills, Projects, Routes } from '@/types';

const data = (() => {
  const routes: Routes[] = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'Project',
      path: '/project',
    },
    {
      id: 3,
      name: 'Experience',
      path: '/experience',
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
      year: '2023',
      demo: 'https://acaramu.vercel.app/',
      code: 'https://github.com/dimmasyusuf/acara',
    },
    {
      id: 2,
      name: 'Talktiv',
      description: 'A social media app for developers.',
      year: '2023',
      demo: 'https://talktiv.vercel.app/',
      code: 'https://github.com/dimmasyusuf/talktiv',
    },
    {
      id: 3,
      name: 'Dicatat',
      description: 'A note-taking app.',
      year: '2023',
      demo: 'https://dicatat.vercel.app/',
      code: 'https://github.com/dimmasyusuf/dicatat',
    },
    {
      id: 4,
      name: 'Food House',
      description: 'Explore best restaurants near you.',
      year: '2022',
      demo: 'https://food-house.vercel.app/',
      code: 'https://github.com/dimmasyusuf/food-house',
    },
    {
      id: 5,
      name: 'Noteable',
      description: 'A note-taking app.',
      year: '2022',
      demo: 'https://noteable.vercel.app/',
      code: 'https://github.com/dimmasyusuf/noteable',
    },
    {
      id: 6,
      name: 'repo-finder',
      description: 'A GitHub repository finder.',
      year: '2022',
      demo: 'https://repo-finder.vercel.app/',
      code: 'https://github.com/dimmasyusuf/repo-finder',
    },
    {
      id: 7,
      name: 'Reading Room',
      description: 'Book tracking app.',
      year: '2022',
      demo: 'https://reading-room.vercel.app/',
      code: 'https://github.com/dimmasyusuf/bookshelf-apps',
    },
    {
      id: 8,
      name: 'NFTopia',
      description: 'A marketplace for NFTs.',
      year: '2022',
      demo: 'https://nftopia.vercel.app/',
      code: 'https://github.com/dimmasyusuf/nftopia',
    },
  ];

  const frontend: Skills[] = [
    {
      id: 1,
      name: 'HTML',
      href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      id: 2,
      name: 'CSS',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      id: 3,
      name: 'JavaScript',
      href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      id: 4,
      name: 'TypeScript',
      href: 'https://www.typescriptlang.org/',
    },
    {
      id: 5,
      name: 'React',
      href: 'https://react.dev/',
    },
    {
      id: 6,
      name: 'Next.js',
      href: 'https://nextjs.org/',
    },
    {
      id: 7,
      name: 'Tailwind CSS',
      href: 'https://tailwindcss.com/',
    },
    {
      id: 8,
      name: 'Chakra UI',
      href: 'https://chakra-ui.com/',
    },
    {
      id: 9,
      name: 'Shadcn UI',
      href: 'https://ui.shadcn.com/',
    },
    {
      id: 10,
      name: 'Redux',
      href: 'https://redux.js.org/',
    },
    {
      id: 11,
      name: 'React Query',
      href: 'https://react-query.tanstack.com/',
    },
    {
      id: 12,
      name: 'Storybook',
      href: 'https://storybook.js.org/',
    },
    {
      id: 13,
      name: 'Jest',
      href: 'https://jestjs.io/',
    },
    {
      id: 14,
      name: 'Cypress',
      href: 'https://www.cypress.io/',
    },
  ];

  const backend: Skills[] = [
    {
      id: 1,
      name: 'Node.js',
      href: 'https://nodejs.org/en/',
    },
    {
      id: 2,
      name: 'Express',
      href: 'https://expressjs.com/',
    },
    {
      id: 3,
      name: 'MongoDB',
      href: 'https://www.mongodb.com/',
    },
    {
      id: 4,
      name: 'Prisma',
      href: 'https://www.prisma.io/',
    },
    {
      id: 5,
      name: 'MySQL',
      href: 'https://www.mysql.com/',
    },
    {
      id: 6,
      name: 'Sequelize',
      href: 'https://sequelize.org/',
    },
    {
      id: 7,
      name: 'Firebase',
      href: 'https://firebase.google.com/',
    },
    {
      id: 8,
      name: 'Supabase',
      href: 'https://supabase.io/',
    },
  ];

  return {
    routes,
    projects,
    frontend,
    backend,
  };
})();

export default data;
