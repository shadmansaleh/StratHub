import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  offender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: ["approved", "declied", "pending"],
    default: "pending",
  },
});

export const Report = mongoose.model("Report", ReportSchema);
export default Report;
