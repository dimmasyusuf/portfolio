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

export type { Routes, Projects, Skills, Songs, Education, Experience };
