"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LocalTypes_1 = require("../types/LocalTypes");
const UserSchema = new mongoose_1.default.Schema({
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
        enum: LocalTypes_1.UserRole,
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
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
    expert_in: {
        type: String,
        enum: LocalTypes_1.ExpertCategory,
        default: "",
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
                from: String,
                to: String,
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
exports.User = mongoose_1.default.model("User", UserSchema);
exports.default = exports.User;
