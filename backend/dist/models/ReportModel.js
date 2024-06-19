"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ReportSchema = new mongoose_1.default.Schema({
    offender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    reporter: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    description: {
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
        enum: ["approved", "declied", "pending"],
        default: "pending",
    },
});
exports.Report = mongoose_1.default.model("Report", ReportSchema);
exports.default = exports.Report;
