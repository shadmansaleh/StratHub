import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
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

export const Message = mongoose.model("Message", MessageSchema);
export default Message;
