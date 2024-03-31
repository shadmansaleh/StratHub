import { Request } from "express";
export interface AuthRequest extends Request {
  user: JWT_USER;
}

export type JWT_USER = {
  name: string;
  id: string;
};
