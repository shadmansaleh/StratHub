import { NextFunction, Request, Response } from "express";

export const LogRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, ":", req.path, " - Time: ", Date.now());
  next();
};

export default LogRequest;
