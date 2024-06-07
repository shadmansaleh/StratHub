import { Request, Response } from "express";
import * as types from "../types/LocalTypes";
import User from "../models/UserModel";
import { StorageDeleteByID } from "./StorageController";
import { set } from "mongoose";

export const UserGetController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const user = await User.findById(req?.user?.id).select("-password").exec();
  res.status(200).json({ message: "User found", user: user });
};
export const UserGetAllController = async (req: Request, res: Response) => {
  const users = await User.find().select("-password").exec();
  res.status(200).json({ users: users });
};

export const UserUpdateController = async (
  req: types.AuthRequest,
  res: Response
) => {
  let user = await User.findById<types.User>(req?.user?.id)
    .select("-password")
    .exec();
  if (!user) return res.status(400).json({ message: "User not found" });

  if (req.body.profile_pic !== user.profile_pic) {
    try {
      await StorageDeleteByID(user.profile_pic, req?.user);
    } catch (e) {
      console.error(e);
    }
  }

  for (let key in req.body) {
    if (User.schema.obj.hasOwnProperty(key)) {
      // @ts-ignore
      user[key] = req.body[key];
    }
  }
  await user.save();
  // const user = await User.findByIdAndUpdate(
  //   req?.user?.id,
  //   { $set: req.body },
  //   { new: true }
  // )
  //   .select("-password")
  //   .exec();
  res.status(200).json({ message: "Profile updated", user: user });
};

export const UserFindUsersController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const type = req.query.type as string;
  const catagories: string[] = (req.query.catagories as string)
    ? JSON.parse(req.query.catagories as string)
    : [];
  const query = req.query.query as string;
  let users = null;
  if (catagories.length > 0) {
    users = await User.find({
      $and: [
        { role: type || "*" },
        { designation: { $in: catagories.length > 0 ? catagories : ["*"] } },
        {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { first_name: { $regex: query, $options: "i" } },
            { last_name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        },
      ],
    })
      .select("-password")
      .exec();
  } else {
    users = await User.find({
      $and: [
        { role: type || "*" },
        {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { first_name: { $regex: query, $options: "i" } },
            { last_name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        },
      ],
    })
      .select("-password")
      .exec();
  }
  res.status(200).json({ users: users });
};

export const UserFavoritesController = async (
  req: types.AuthRequest,
  res: Response
) => {
  let data = null;
  if (req.query.populate_data === "true") {
    data = await User.findById(req?.user?.id)
      .select("favorites")
      .populate("favorites")
      .exec();
  } else {
    data = await User.findById(req?.user?.id).select("favorites").exec();
  }
  if (!data) return res.status(400).json({ message: "Favorites not found" });
  res.status(200).json({ favorites: data.favorites });
};

export const UserAddFavoriteController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const user = await User.findById(req?.user?.id).exec();
  if (!user) return res.status(400).json({ message: "User not found" });
  const favorite = await User.findById(req.body.favorite_id).exec();
  if (!favorite) return res.status(400).json({ message: "Favorite not found" });
  if (!user.favorites.includes(req.body.favorite_id)) {
    user.favorites.push(req.body.favorite_id);
    await user.save();
  } else {
    return res.status(400).json({ message: "Favorite already added" });
  }
  res.status(200).json({ message: "Favorite added" });
};

export const UserRemoveFavoriteController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const user = await User.findById(req?.user?.id).exec();
  if (!user) return res.status(400).json({ message: "User not found" });
  const favorite = await User.findById(req.body.favorite_id).exec();
  if (!favorite) return res.status(400).json({ message: "Favorite not found" });
  if (user.favorites.includes(req.body.favorite_id)) {
    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.body.favorite_id
    );
    await user.save();
  } else {
    return res.status(400).json({ message: "Not in favorite list" });
  }
  res.status(200).json({ message: "Favorite removed" });
};
