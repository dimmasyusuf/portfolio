interface Routes {
  id: number;
  name: string;
  path: string;
}

interface Projects {
  id: number;
  name: string;
  description: string;
  year: number;
  demoUrl: string;
  repoUrl: string;
}

interface Skills {
  id: number;
  name: string;
  url?: string;
}

interface Songs {
  title: string;
  albumImageUrl: string;
  artistName: string;
  artistUrl: string;
  songUrl: string;
  isPlaying: boolean;
}

interface Educations {
  id: number;
  university: string;
  major: string;
  startDate: string;
  endDate: string;
  logoUrl: string;
}

interface Experiences {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  logoUrl: string;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

interface Support {
  id: string;
  name: string;
  message: string;
  totalUnit: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export type {
  Routes,
  Projects,
  Skills,
  Songs,
  Educations,
  Experiences,
  User,
  Message,
  Support,
};
