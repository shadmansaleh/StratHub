import { Router } from "express";
import {
  UserLoginController,
  UserLogoutController,
  UserRegisterController,
  UserGetController,
  UserGetAllController,
  UserCheckUsernameTakenController,
  UserCheckEmailTakenController,
  UserUpdatePasswordController,
} from "../controller/UserController";
import { UserRole } from "../types/LocalTypes";
import { AuthUser, AuthRole } from "../middlewares/Authenticate";

const user = Router();

user.post("/login", UserLoginController);
user.delete("/logout", AuthUser, UserLogoutController);
user.get("/verify_token", AuthUser, (_req, res) =>
  res.status(200).json({ message: "Token is valid" })
);
user.post("/register", UserRegisterController);
user.get("/get_user", AuthUser, UserGetController);
user.get(
  "/all_users",
  AuthUser,
  AuthRole(UserRole.ADMIN),
  UserGetAllController
);

user.get("/username_taken", UserCheckUsernameTakenController);
user.get("/email_taken", UserCheckEmailTakenController);
user.post("/update_password", UserUpdatePasswordController);

export default user;
