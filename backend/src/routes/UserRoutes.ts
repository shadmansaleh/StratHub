const { Router } = require("express");
const {
  UserLoginController,
  UserLogoutController,
  UserCreateController,
  UserGetController,
} = require("../controller/UserController");
const AuthenticateToken = require("../middlewares/AuthenticateToken");
const user = Router();

user.post("/login", UserLoginController);
user.delete("/logout", AuthenticateToken as any, UserLogoutController as any);
user.post("/create_user", UserCreateController);
user.get("/get_user", AuthenticateToken as any, UserGetController as any);

module.exports = user;
