import { Router } from "express";
import {
  UserGetController,
  UserGetAllController,
  UserUpdateController,
  UserFindUsersController,
  UserFavoritesController,
  UserAddFavoriteController,
  UserRemoveFavoriteController,
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
user.post("/update_profile", AuthUser, UserUpdateController);
user.get("/find_users", AuthUser, UserFindUsersController);
user.get("/favorites", AuthUser, UserFavoritesController);
user.post("/add_favorite", AuthUser, UserAddFavoriteController);
user.post("/remove_favorite", AuthUser, UserRemoveFavoriteController);

export default user;
