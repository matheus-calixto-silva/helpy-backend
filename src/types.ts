export interface ICategory {
  _id: string;
  name: string
  description: string
}

export interface ISkill {
  _id: string;
  name: string
  category: ICategory
}

export interface IOng {
  _id: string;
  name: string;
  username: string;
  passwordHash: string;
  email: string;
  phone: string;
  address: string;
  cnpj: string;
  maxEvents: number;
  profilePic: string;
  events: IEvent[]
}

export interface IEvent {
  _id: string;
  name: string;
  local: string;
  date: Date;
  description: string;
  requiredSkills: ISkill[];
  maxVolunteers: number;
  volunteers: IUser[];
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  passwordHash: string;
  email: string;
  phone: string;
  skills: ISkill[];
  profilePic: string;
  created_at: number;
  updated_at: number;
}
