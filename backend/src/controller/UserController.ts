import { Request, Response } from "express";
import * as types from "../types/LocalTypes";
import User from "../models/UserModel";
import { StorageDeleteByID } from "./StorageController";

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

export const UserFindUsersController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const type = req.query.type as string;
  const catagories = req.query.catagories as string[];
  const query = req.query.query as string;
  const users = await User.find({
    $and: [
      { role: type || "*" },
      // { designation: { $in: catagories } },
      {
        $or: [
          { username: { $regex: query, $options: "i" } },
          { firstname: { $regex: query, $options: "i" } },
          { lastname: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      },
    ],
  })
    .select("-password")
    .exec();
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

export default {
  UserGetController,
  UserGetAllController,
};
