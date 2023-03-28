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
interface IUserBase {
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
  role: string;
}
export interface IOng extends IUserBase {
  address: string;
  cnpj: string;
  maxEvents: number;
  events: IEvent[]
}

export interface IUser extends IUserBase {
  skills: ISkill[];
}

export interface IAdmin extends IUserBase {
  permissions: permissions;
  extends: IUserBase
}

type permissions = 'create' | 'read' | 'update' | 'delete';
