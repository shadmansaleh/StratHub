import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export const Session = mongoose.model("Session", SessionSchema);
export default Session;
