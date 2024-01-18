interface Routes {
  id: number;
  name: string;
  path: string;
}

interface Projects {
  id: number;
  name: string;
  description: string;
  year: string;
  demo: string;
  code: string;
}

interface Skills {
  id: number;
  name: string;
  href?: string;
}

interface Songs {
  title: string;
  albumImageUrl: string;
  artistName: string;
  artistUrl: string;
  songUrl: string;
  isPlaying: boolean;
}

interface Education {
  id: number;
  name: string;
  major: string;
  startDate: string;
  endDate: string;
  description?: string;
  logo: string;
  grade?: string;
  activities?: string;
}

interface Experience {
  id: number;
  name: string;
  job: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
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

export type {
  Routes,
  Projects,
  Skills,
  Songs,
  Education,
  Experience,
  User,
  Message,
};
