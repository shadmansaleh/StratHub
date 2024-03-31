const { Router } = require("express");
const {
  UserLoginController,
  UserLogoutController,
  UserCreateController,
  UserGetController,
  UserGetAllController,
} = require("../controller/UserController");
const { UserRole } = require("../types/LocalTypes");
const { AuthUser, AuthRole } = require("../middlewares/Authenticate");
const user = Router();

user.post("/login", UserLoginController);
user.delete("/logout", AuthUser as any, UserLogoutController as any);
user.post("/create_user", UserCreateController);
user.get("/get_user", AuthUser as any, UserGetController as any);
user.get(
  "/all_users",
  AuthUser as any,
  AuthRole(UserRole.ADMIN),
  UserGetAllController as any
);

module.exports = user;
