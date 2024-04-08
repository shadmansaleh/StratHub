import { Request, Response } from "express";
import * as types from "../types/LocalTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/UserModel";
import Session from "../models/SessionModel";

export const UserRegisterController = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await User.findOne({ email: email }).exec();
  if (user != null)
    return res.status(400).json({ message: "Email already exists" });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const UserUpdatePasswordController = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await User.findOne({ email: email }).exec();
  if (user == null) return res.status(400).json({ message: "Email Not found" });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const UserLoginController = async (req: Request, res: Response) => {
  const { username, email, password, is_short } = req.body;
  if (!(email || username) || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  let user: types.User;
  if (email) user = <types.User>await User.findOne({ email: email }).exec();
  else user = <types.User>await User.findOne({ username: username }).exec();
  if (user == null)
    return res.status(400).json({ message: "User does not exist" });

  try {
    if (await bcrypt.compare(password, user.password)) {
      const jwt_user: types.JWT_USER = {
        name: user.username,
        id: user._id,
        role: user.role,
      };
      const token = await jwt.sign(
        jwt_user,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: is_short ? "1h" : "30d",
        }
      );
      const session = new Session({
        id: jwt_user.id,
        token: token,
      });
      await session.save();
      res
        .status(200)
        .json({ message: "Login successful", token: token, role: user.role });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const UserLogoutController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const sessions = <types.Session[]>(
    await Session.find({ id: req?.user?.id, token: token })
  );
  sessions.forEach(async (session) => {
    await Session.deleteOne({ _id: session._id });
  });
  res.status(200).json({ message: "Logout Successful" });
};
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

export const UserCheckUsernameTakenController = async (
  req: Request,
  res: Response
) => {
  const { username } = req.query;
  if (!username)
    return res.status(400).json({ message: "Please enter all fields" });

  const user = await User.findOne({ username: username as string }).exec();
  res.status(200).json({ taken: user != null });
};
export const UserCheckEmailTakenController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.query;
  if (!email)
    return res.status(400).json({ message: "Please enter all fields" });

  const user = await User.findOne({ email: email as string }).exec();
  res.status(200).json({ taken: user != null });
};

export default {
  UserLoginController,
  UserLogoutController,
  UserRegisterController,
  UserGetController,
  UserGetAllController,
  UserCheckUsernameTakenController,
  UserCheckEmailTakenController,
  UserUpdatePasswordController,
};
