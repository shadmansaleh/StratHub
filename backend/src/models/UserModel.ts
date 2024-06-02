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
  experience: {
    type: Number,
    default: 0,
  },
  hour_rate: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },

  expertdata: {
    type: {
      ref_docs: {
        type: [String],
      },
      approved: {
        type: Boolean,
      },
    },
    default: {
      ref_docs: [],
      approved: false,
    },
  },

  settings: {
    type: {
      notifications: {
        type: Boolean,
      },
      dark_mode: {
        type: Boolean,
      },
      language: {
        type: String,
      },
      visibility: {
        type: ["public", "private"],
      },
      availability: {
        type: ["active", "away", "busy"],
      },
    },
    default: {
      notifications: true,
      dark_mode: false,
      language: "english",
      visibility: "public",
    },
  },
});

export const User = mongoose.model("User", UserSchema);
export default User;
