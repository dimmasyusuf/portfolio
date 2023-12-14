import { Routes } from '@/types';

const data = (() => {
  const routes: Routes[] = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Projects',
      path: '/projects',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ];

  return {
    routes,
  };
})();

export default data;
