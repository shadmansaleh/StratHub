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
  profile_pic: {
    type: String,
    default: "",
  },
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  designation: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  timezone: {
    type: String,
    default: "",
  },
  companies: {
    type: [String],
    default: [],
  },
});

export const User = mongoose.model("User", UserSchema);
export default User;
