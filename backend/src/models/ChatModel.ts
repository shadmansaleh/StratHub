import mongoose from "mongoose";

const MsgType = {
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    default: "",
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["sent", "seen"],
    default: "sent",
  },
};

const ChatSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  last_message: {
    type: MsgType,
    default: null,
  },
  msg_updates: {
    type: {
      user1: [MsgType],
      user2: [MsgType],
    },
    default: {
      user1: [],
      user2: [],
    },
  },
  conversation: {
    type: [MsgType],
    default: [],
  },
});

export const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
