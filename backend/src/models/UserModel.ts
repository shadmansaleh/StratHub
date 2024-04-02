import mongoose from "mongoose";
import { UserRole } from "../types/LocalTypes";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: UserRole,
    default: "user",
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
export default User;
