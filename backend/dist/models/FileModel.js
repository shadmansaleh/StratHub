"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FileSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    path: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    uploadFname: {
        type: String,
        required: true,
    },
    filetype: {
        type: String,
        required: true,
    },
    permission: {
        type: String,
        enum: ["private", "public", "restricted"],
        required: true,
        default: "private",
    },
    permission_allowlist: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
});
exports.FileModel = mongoose_1.default.model("File", FileSchema);
exports.default = exports.FileModel;
