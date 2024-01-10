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
  albumImageUrl: string;
  artistName: string;
  songUrl: string;
  title: string;
  timePlayed: number;
  timeTotal: number;
  artistUrl: string;
  isPlaying: boolean;
}

export type { Routes, Projects, Skills, Songs };
