import { Request, Response } from "express";
import * as types from "../types/LocalTypes";
import User from "../models/UserModel";

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

export default {
  UserGetController,
  UserGetAllController,
};
