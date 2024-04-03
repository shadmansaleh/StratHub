import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";

export const addEmailIfUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username } = req.body;
  if (!email && username) {
    const user = await User.findOne({ username: username }).exec();
    if (user) req.body.email = user?.email;
  }
  next();
};

export default { addEmailIfUsername };
