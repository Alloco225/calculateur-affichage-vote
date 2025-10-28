export interface Candidate {
  id: string;
  name: string;
  votes: number;
  color: string;
  image?: string;
}

export interface Campaign {
  id: string;
  title: string;
  location: string;
  candidates: Candidate[];
  createdAt: number;
  updatedAt: number;
}
