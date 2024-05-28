export type JWT_USER = {
  name: string;
  id: string;
  role: UserRole;
};

export interface User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profile_pic: string;
  first_name: string;
  last_name: string;
  designation: string;
  phone: string;
  location: string;
  timezone: string;
  companies: string[];
}

export type Session = {
  id: string;
  token: string;
};

export enum UserRole {
  ADMIN = "admin",
  EXPERT = "expert",
  USER = "user",
}
