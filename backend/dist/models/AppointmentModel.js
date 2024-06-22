"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppointmentSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true,
    },
    start_time: {
        type: String,
        required: true,
    },
    expert: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    client: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        required: true,
    },
});
exports.Appointment = mongoose_1.default.model("Appointment", AppointmentSchema);
exports.default = exports.Appointment;
