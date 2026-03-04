export interface Project {
  id: number;
  name: string;
  type: string;
  area: string;
  bedrooms: number;
  status: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  photo: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export type ModalType = 'project' | 'team' | 'user' | null;

export type CurrentPage = 'dashboard' | 'projects' | 'team' | 'users';