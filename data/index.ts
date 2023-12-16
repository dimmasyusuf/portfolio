import { Projects, Routes, Skills } from '@/types';

const data = (() => {
  const routes: Routes[] = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'Skills',
      path: '/skills',
    },
    {
      id: 3,
      name: 'Projects',
      path: '/projects',
    },
    {
      id: 4,
      name: 'Contact',
      path: '/contact',
    },
  ];

  const projects: Projects[] = [
    {
      id: 1,
      name: 'Talktiv',
      description: 'A social media app for developers.',
      year: '2021',
      demo: 'https://talktiv.vercel.app/',
      code: 'https://github.com/dimmasyusuf/talktiv',
    },
    {
      id: 2,
      name: 'Dicatat',
      description: 'A note-taking app.',
      year: '2022',
      demo: 'https://dicatat.vercel.app/',
      code: 'https://github.com/dimmasyusuf/dicatat',
    },
    {
      id: 3,
      name: 'Food House',
      description: 'Explore best restaurants near you.',
      year: '2021',
      demo: 'https://food-house.vercel.app/',
      code: 'https://github.com/dimmasyusuf/food-house',
    },
    {
      id: 4,
      name: 'Noteable',
      description: 'A note-taking app.',
      year: '2022',
      demo: 'https://noteable.vercel.app/',
      code: 'https://github.com/dimmasyusuf/noteable',
    },
    {
      id: 5,
      name: 'repo-finder',
      description: 'A GitHub repository finder.',
      year: '2022',
      demo: 'https://repo-finder.vercel.app/',
      code: 'https://github.com/dimmasyusuf/repo-finder',
    },
    {
      id: 6,
      name: 'Reading Room',
      description: 'Book tracking app.',
      year: '2022',
      demo: 'https://reading-room.vercel.app/',
      code: 'https://github.com/dimmasyusuf/bookshelf-apps',
    },
    {
      id: 7,
      name: 'NFTopia',
      description: 'A marketplace for NFTs.',
      year: '2022',
      demo: 'https://nftopia.vercel.app/',
      code: 'https://github.com/dimmasyusuf/nftopia',
    },
  ];

  const skills: Skills[] = [
    {
      id: 1,
      name: 'HTML',
      category: 'Frontend',
      level: 'Advanced',
    },
    {
      id: 2,
      name: 'CSS',
      category: 'Frontend',
      level: 'Advanced',
    },
    {
      id: 3,
      name: 'JavaScript',
      category: 'Frontend',
      level: 'Advanced',
    },
    {
      id: 4,
      name: 'TypeScript',
      category: 'Frontend',
      level: 'Intermediate',
    },
    {
      id: 5,
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 'Advanced',
    },
    {
      id: 6,
      name: 'Chakra UI',
      category: 'Frontend',
      level: 'Advanced',
    },
    {
      id: 7,
      name: 'Shadcn UI',
      category: 'Frontend',
      level: 'Advanced',
    },
    {
      id: 8,
      name: 'React.js',
      category: 'Frontend',
      level: 'Advanced',
    },
    {
      id: 9,
      name: 'Next.js',
      category: 'Frontend',
      level: 'Advanced',
    },
    {
      id: 10,
      name: 'Node.js',
      category: 'Backend',
      level: 'Intermediate',
    },
    {
      id: 11,
      name: 'Express.js',
      category: 'Backend',
      level: 'Intermediate',
    },
    {
      id: 12,
      name: 'Firebase',
      category: 'Backend',
      level: 'Intermediate',
    },
    {
      id: 13,
      name: 'Supabase',
      category: 'Backend',
      level: 'Intermediate',
    },
    {
      id: 14,
      name: 'MySQL',
      category: 'Database',
      level: 'Intermediate',
    },
    {
      id: 15,
      name: 'MongoDB',
      category: 'Database',
      level: 'Intermediate',
    },
    {
      id: 16,
      name: 'Sequelize',
      category: 'Database',
      level: 'Intermediate',
    },
    {
      id: 17,
      name: 'Prisma',
      category: 'Database',
      level: 'Intermediate',
    },
    {
      id: 18,
      name: 'Redux',
      category: 'State Management',
      level: 'Intermediate',
    },
    {
      id: 19,
      name: 'React Query',
      category: 'State Management',
      level: 'Intermediate',
    },
    {
      id: 20,
      name: 'Framer Motion',
      category: 'Animation',
      level: 'Beginner',
    },
    {
      id: 21,
      name: 'Vitest',
      category: 'Testing',
      level: 'Beginner',
    },
    {
      id: 22,
      name: 'Jest',
      category: 'Testing',
      level: 'Beginner',
    },
    {
      id: 23,
      name: 'Cypress',
      category: 'Testing',
      level: 'Beginner',
    },
    {
      id: 24,
      name: 'React Testing Library',
      category: 'Testing',
      level: 'Beginner',
    },
    {
      id: 25,
      name: 'Storybook',
      category: 'Testing',
      level: 'Beginner',
    },
    {
      id: 26,
      name: 'Git',
      category: 'Version Control',
      level: 'Intermediate',
    },
    {
      id: 27,
      name: 'GitHub',
      category: 'Version Control',
      level: 'Intermediate',
    },
    {
      id: 28,
      name: 'Jira',
      category: 'Project Management',
      level: 'Intermediate',
    },
    {
      id: 29,
      name: 'Trello',
      category: 'Project Management',
      level: 'Intermediate',
    },
    {
      id: 30,
      name: 'Figma',
      category: 'Design',
      level: 'Intermediate',
    },
  ];

  return {
    routes,
    projects,
    skills,
  };
})();

export default data;
