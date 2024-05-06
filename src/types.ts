import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ICategory {
  _id: string;
  name: string;
  description: string;
}

export interface ISkill {
  _id: string;
  name: string;
  category: ICategory;
}

export interface IAdress {
  street: string;
  city: string;
  uf: string;
  latitude: string;
  longitude: string;
}

export interface IEvent {
  _id: string;
  name: string;
  address: IAdress;
  date: Date;
  description: string;
  requiredSkills: ISkill[];
  maxVolunteers: number;
  volunteers: IUser[];
  eventPic: string;
}

export interface IEventForm {
  _id: string;
  name: string;
  street: string;
  city: string;
  uf: string;
  latitude: string;
  longitude: string;
  date: Date;
  description: string;
  requiredSkills: ISkill[];
  maxVolunteers: number;
  volunteers: IUser[];
  eventPic: string;
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
  events: IEvent[];
}

export interface IUser extends IAdmin {
  skills: ISkill[];
}

export interface ICustomRequest extends Request {
  token: string | JwtPayload;
}

type role = 'admin' | 'user' | 'ong';
