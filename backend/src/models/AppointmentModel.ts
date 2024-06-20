import mongoose from "mongoose";
import { start } from "repl";

const AppointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
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
    type: ["pending", "completed", "cancelled"],
    required: true,
  },
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
