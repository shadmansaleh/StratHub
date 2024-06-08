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
  city: {
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
  hourly_rate: {
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

  expert_data: {
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

  reviews: {
    type: [
      {
        name: String,
        rating: Number,
        review: String,
      },
    ],
    default: [],
  },

  links: {
    type: {
      site: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
    default: {
      site: "",
      linkedin: "",
    },
  },

  skill_list: {
    type: [String],
    default: [],
  },

  work_details: {
    type: [
      {
        company: String,
        designation: String,
        start_date: Date,
        end_date: Date,
        location: String,
        description: String,
      },
    ],
    default: [],
  },

  appointment_times: {
    type: [
      {
        from: Date,
        to: Date,
      },
    ],
    default: [],
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
        type: String,
        enum: ["public", "private"],
      },
      availability: {
        type: String,
        enum: ["active", "away", "busy"],
      },
    },
    default: {
      notifications: true,
      dark_mode: false,
      language: "english",
      visibility: "public",
      availability: "active",
    },
  },
});

export const User = mongoose.model("User", UserSchema);
export default User;
