import { Router } from "express";
import { globalStorage } from "../middlewares/MulterMiddleware";
import { UserRole } from "../types/LocalTypes";
import { AuthUser, AuthRole } from "../middlewares/Authenticate";

const root = Router();

root.post("/upload", AuthUser, globalStorage.single("file"), (req, res) => {
  res.json({ message: "File uploaded", url: req.body.url });
});

export default root;
