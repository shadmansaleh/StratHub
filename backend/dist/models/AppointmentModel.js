"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppointmentSchema = new mongoose_1.default.Schema({
    Date: {
        type: Date,
        required: true,
    },
    Service: {
        type: String,
        required: true,
    },
    expert: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    client: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: ["pending", "completed", "cancelled"],
        required: true,
    },
});
exports.Appointment = mongoose_1.default.model("Appointment", AppointmentSchema);
exports.default = exports.Appointment;
