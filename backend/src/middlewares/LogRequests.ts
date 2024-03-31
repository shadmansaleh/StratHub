import { NextFunction, Request, Response } from "express";

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, " - Time: ", Date.now());
  next();
};

module.exports = timeLog;
