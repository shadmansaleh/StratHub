import mongoose from "mongoose";

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
    type: {
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
    },
    default: null,
  },
  conversation: {
    type: [
      {
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
      },
    ],
    default: [],
  },
});

export const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
