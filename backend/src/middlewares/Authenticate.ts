import { NextFunction, Request, Response } from "express";
import * as types from "../types/LocalTypes";
import jwt from "jsonwebtoken";
import Session from "../models/SessionModel";

export const AuthUser = async (
  req: Request & { user?: types.JWT_USER },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : req.cookies["token"];
  if (!token)
    return res.status(401).json({ message: "Authentication Token Missing" });

  try {
    const jwt_user = await (<types.JWT_USER>(
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string)
    ));
    const session = await Session.findOne({ id: jwt_user.id, token: token });
    if (session == null)
      return res.status(401).json({ message: "Authentication Token Expired" });
    req.user = jwt_user;
    next();
  } catch (e) {
    console.error("Error: ", e);
    return res.status(403).json({ message: "Invalid Token" });
  }
};

export const AuthRole = (role: types.UserRole | types.UserRole[]) => {
  return (req: types.AuthRequest, res: Response, next: NextFunction) => {
    if (!Array.isArray(role)) role = [role];
    if (!req?.user?.role)
      return res.status(500).json({ message: "Server Error" });
    if (!role.includes(req.user.role))
      return res.status(401).json({ message: "Unauthorized" });
    next();
  };
};

export default {
  AuthUser,
  AuthRole,
};
