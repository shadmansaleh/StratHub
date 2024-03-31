import { NextFunction, Request, Response } from "express";
import * as types from "../types/LocalTypes";
const jwt = require("jsonwebtoken");
const Session = require("../models/SessionModel");

const AuthUser = async (
  req: types.AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
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
  } catch (error) {
    console.error("Error: ", error);
    return res.status(403).json({ message: "Invalid Token" });
  }
};

const AuthRole = (role: types.UserRole | types.UserRole[]) => {
  return (req: types.AuthRequest, res: Response, next: NextFunction) => {
    if (!Array.isArray(role)) role = [role];
    if (!role.includes(req.user.role))
      return res.status(401).json({ message: "Unauthorized" });
    next();
  };
};

module.exports = {
  AuthUser,
  AuthRole,
};
