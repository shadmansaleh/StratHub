const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (_req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "./public/uploads");
  },
  filename: function (_req: Request, file: Express.Multer.File, cb: any) {
    cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: any) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const uploadMiddleware = multer({ storage, fileFilter });
export default uploadMiddleware;