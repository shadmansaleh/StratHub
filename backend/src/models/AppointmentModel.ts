import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
  },
  Service: {
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
  status: {
    type: ["pending", "completed", "cancelled"],
    required: true,
  },
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
