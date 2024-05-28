const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (_req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "./public/uploads");
  },
  filename: function (_req: Request, file: Express.Multer.File, cb: any) {
    const fname = `${uuidv4()}_${path.extname(file.originalname)}`;
    _req.body.fname = fname;
    _req.body.url = `http://localhost:5000/uploads/${fname}`;
    cb(null, fname);
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
