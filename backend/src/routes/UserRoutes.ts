import { Router } from "express";
import {
  UserLoginController,
  UserLogoutController,
  UserCreateController,
  UserGetController,
  UserGetAllController,
} from "../controller/UserController";
import { UserRole } from "../types/LocalTypes";
import { AuthUser, AuthRole } from "../middlewares/Authenticate";
const user = Router();

user.post("/login", UserLoginController);
user.delete("/logout", AuthUser, UserLogoutController);
user.post("/register", UserCreateController);
user.get("/get_user", AuthUser, UserGetController);
user.get(
  "/all_users",
  AuthUser,
  AuthRole(UserRole.ADMIN),
  UserGetAllController
);

export default user;
