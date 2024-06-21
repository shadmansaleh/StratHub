import { Response } from "express";
import * as types from "../types/LocalTypes";

import User from "../models/UserModel";
import Chat from "../models/ChatModel";
import { Types } from "mongoose";

export const ChatGetThreadListController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const id = (req.query.id || req?.user?.id) as string | undefined;
  if (!id) return res.status(400).json({ message: "User ID not found" });
  try {
    const threads = await Chat.find({
      $or: [{ user1: id }, { user2: id }],
    })
      .select("user1 user2 last_message")
      .populate([
        {
          path: "user1",
          select: "first_name last_name profile_pic",
        },
        {
          path: "user2",
          select: "first_name last_name profile_pic",
        },
        {
          path: "last_message",
        },
      ])
      .exec();
    res.status(200).json({ threads: threads });
  } catch (e: any) {
    console.error("Error: ", e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const ChatGetConversationController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ message: "Thread ID not given" });
  try {
    let thread = await Chat.findById(id)
      .select("user1 user2 conversation")
      .exec();
    if (!thread) return res.status(404).json({ message: "Thread not found" });
    if (
      thread?.user1?.toString() !== req?.user?.id &&
      thread?.user2?.toString() !== req?.user?.id
    )
      return res.status(401).json({ message: "Unauthorized" });
    await thread.populate("conversation");

    return res.status(200).json({ conversation: thread.conversation });
  } catch (e: any) {
    console.error("Error: ", e.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const ChatSendController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const to = req.body.to;
  const from = req?.user?.id;
  const id = req.body.id;
  const content = req.body.content;
  const date = req.body.date;

  try {
    const chat = id
      ? await Chat.findById(id).exec()
      : new Chat({
          user1: from,
          user2: to,
        });
    if (!chat) return res.status(404).json({ message: "Thread not found" });
    if (chat?.user1?.toString() !== from && chat?.user2?.toString() !== from)
      return res.status(401).json({ message: "Unauthorized" });
    if (chat?.user1?.toString() !== to && chat?.user2?.toString() !== to)
      return res.status(400).json({ message: "Wrong Conversation" });
    const msg = {
      sender: new Types.ObjectId(from),
      content: content,
      date: new Date(date),
      status: "sent" as "sent" | "seen",
    };

    chat.conversation.push(msg);
    chat.last_message = msg;
    chat.save();
    return res.status(200).json({ message: "Message sent" });
  } catch (e: any) {
    console.error("Error: ", e.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const ChatFindThreadController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const to = req.query.user as string | undefined;
  const from = req?.user?.id as string;
  if (!to || !from) return res.status(400).json({ message: "User not given" });
  try {
    let new_thread = false;
    let thread = await Chat.findOne({
      $or: [
        { user1: to, user2: from },
        { user1: from, user2: to },
      ],
    }).exec();

    if (!thread) {
      const user1 = await User.findById(from).exec();
      const user2 = await User.findById(to).exec();
      if (!user1 || !user2)
        return res.status(400).json({ message: "User not found" });
      // @ts-ignore
      thread = new Chat({
        user1: user1,
        user2: user2,
      });
      thread.save();
      new_thread = true;
    }
    if (!thread) throw new Error("Thread not found and could not be created");
    return res
      .status(200)
      .json({ new_thread: new_thread, thread: thread, thread_id: thread._id });
  } catch (e: any) {
    console.error("Error: ", e.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
