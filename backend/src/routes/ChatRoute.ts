import { Router } from "express";
import {
  ChatGetThreadListController,
  ChatGetConversationController,
  ChatSendController,
  ChatFindThreadController,
} from "../controller/ChatController";

const chat = Router();

chat.get("/thread_list", ChatGetThreadListController);
chat.get("/find_thread", ChatFindThreadController);
chat.get("/get_conversation", ChatGetConversationController);
chat.post("/send_message", ChatSendController);

export default chat;
