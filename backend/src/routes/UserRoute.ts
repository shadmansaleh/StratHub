import { Router } from "express";
import {
  UserGetController,
  UserGetAllController,
} from "../controller/UserController";
import { UserRole } from "../types/LocalTypes";
import { AuthUser, AuthRole } from "../middlewares/Authenticate";

const user = Router();

user.get("/get_user", AuthUser, UserGetController);
user.get(
  "/all_users",
  AuthUser,
  AuthRole(UserRole.ADMIN),
  UserGetAllController
);

export default user;
