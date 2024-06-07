import { Router } from "express";
import { secureStorage } from "../middlewares/MulterMiddleware";
import { AuthUser, AuthRole } from "../middlewares/Authenticate";
import {
  StorageUploadController,
  StorageGetController,
  StorageDeleteController,
} from "../controller/StorageController";

const storage = Router();

storage.post(
  "/upload",
  AuthUser,
  secureStorage.single("file"),
  StorageUploadController as any
);

storage.get("/:id", AuthUser, StorageGetController);
storage.delete("/:id", AuthUser, StorageDeleteController);

export default storage;
