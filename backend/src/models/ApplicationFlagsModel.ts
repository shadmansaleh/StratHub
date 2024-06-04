import mongoose from "mongoose";

const ApplicationFlagsSchema = new mongoose.Schema({
  categories: {
    type: [String],
    default: [],
  },
  block_registration: {
    type: Boolean,
    default: false,
  },
});

export const ApplicationFlags = mongoose.model(
  "ApplicationFlags",
  ApplicationFlagsSchema
);
export default ApplicationFlags;
