import { Request } from "express";
import { Document } from "mongoose";
export interface AuthRequest extends Request {
  user?: JWT_USER;
}

export type JWT_USER = {
  name: string;
  id: string;
  role: UserRole;
};

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Session extends Document {
  id: string;
  token: string;
}

export enum UserRole {
  ADMIN = "admin",
  EXPERT = "expert",
  USER = "user",
}
