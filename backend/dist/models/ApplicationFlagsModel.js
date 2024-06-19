"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFlags = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApplicationFlagsSchema = new mongoose_1.default.Schema({
    categories: {
        type: [String],
        default: [],
    },
    block_registration: {
        type: Boolean,
        default: false,
    },
});
exports.ApplicationFlags = mongoose_1.default.model("ApplicationFlags", ApplicationFlagsSchema);
exports.default = exports.ApplicationFlags;
