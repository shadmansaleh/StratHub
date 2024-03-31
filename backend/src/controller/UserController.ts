import { Request, Response } from "express";
import * as types from "../types/LocalTypes";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");
const Session = require("../models/SessionModel");

const UserCreateController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
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
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const UserLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await User.findOne({ email: email }).exec();
  if (user == null)
    return res.status(400).json({ message: "User does not exist" });

  try {
    if (await bcrypt.compare(password, user.password)) {
      const jwt_user = {
        name: user.username,
        id: user._id,
      };
      const token = await jwt.sign(
        jwt_user,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );
      const session = new Session({
        id: jwt_user.id,
        token: token,
      });
      await session.save();
      res.status(200).json({ message: "Login successful", token: token });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const UserLogoutController = async (req: types.AuthRequest, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const sessions = await (<any[]>(
    Session.find({ id: req.user.id, token: token })
  ));
  sessions.forEach(async (session) => {
    await Session.deleteOne({ _id: session._id });
  });
  res.status(200).json({ message: "Logout Successful" });
};
const UserGetController = async (req: types.AuthRequest, res: Response) => {
  const user = await User.findById(req.user.id).select("-password").exec();
  res.status(200).json({ message: "User found", user: user });
};

module.exports = {
  UserLoginController,
  UserLogoutController,
  UserCreateController,
  UserGetController,
};
