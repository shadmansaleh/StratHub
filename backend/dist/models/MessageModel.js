"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    recipient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    text: {
        type: String,
        required: true,
        default: "",
    },
    Date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["sent", "seen"],
    },
});
exports.Message = mongoose_1.default.model("Message", MessageSchema);
exports.default = exports.Message;
