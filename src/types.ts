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

export interface IAdmin {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  passwordHash?: string;
  email: string;
  phone: string;
  profilePic: string;
  created_at: number;
  updated_at: number;
  role: role;
}
export interface IOng extends IAdmin {
  address: string;
  cnpj: string;
  maxEvents: number;
  events: IEvent[]
}

export interface IUser extends IAdmin {
  skills: ISkill[];
}

type role = 'admin' | 'user' | 'ong';
