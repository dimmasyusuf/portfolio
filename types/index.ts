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
  category: string;
  level: string;
}

export type { Routes, Projects, Skills };
