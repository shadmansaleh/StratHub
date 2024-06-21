import useQuery from "@/hooks/useQuery";
import demo_profile_pic from "@/assets/profile_demo.svg";
import TextBox from "@/components/TextBox";
import { IoIosAddCircle } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/contexts/GlobalProvider";
import { strCapitalize } from "@/utils/utils";
import Loading from "@/components/Loading";
import { useSearchParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";

type Message = {
  sender: string;
  content: string;
  date: Date;
  status: "sent" | "seen";
};

type thread_info = {
  id: string;
  name: string;
  avatar: string;
  user1: {
    id: string;
    first_name: string;
    last_name: string;
    profile_pic: string;
  };
  user2: {
    id: string;
    first_name: string;
    last_name: string;
    profile_pic: string;
  };
  last_message: string | null;
  last_message_status: "sent" | "seen";
  me: "user1" | "user2";
};

function profile_pic(id: string) {
  if (!id) return demo_profile_pic;
  return __BACKEND_URL__ + "/storage/" + id;
}

function Chat() {
  const { axios } = useAxios();
  const { global } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  let currentThreadID: string = searchParams.get("id") || "";
  const [threadText, setThreadText] = useState<{
    [key: string]: string;
  }>({});
  const messageBox = useRef<HTMLInputElement>(null);

  const user = global?.user;

  const {
    data: threadList,
    isLoading: threadListLoading,
    reload: reloadThreadList,
  } = useQuery<thread_info[]>("/chat/thread_list", {
    blockers: [!user],
    filter: (data: any) => {
      return data.threads.map((thread: any) => {
        const me = thread.user1._id === user?.id ? "user1" : "user2";
        const first_name =
          me === "user1" ? thread.user2.first_name : thread.user1.first_name;
        const last_name =
          me === "user1" ? thread.user2.last_name : thread.user1.last_name;
        let status = thread.last_message?.status || "seen";
        if (status === "sent" && thread.last_message.sender === user?.id) {
          status = "seen";
        }
        return {
          id: thread._id,
          name: strCapitalize(first_name + " " + last_name),
          avatar:
            me == "user1"
              ? profile_pic(thread.user2.profile_pic)
              : profile_pic(thread.user1.profile_pic),
          last_message: thread.last_message?.content || thread.last_message,
          last_message_status: status,
          user1: {
            id: thread.user1._id,
            first_name: thread.user1.first_name,
            last_name: thread.user1.last_name,
            profile_pic: profile_pic(thread.user1.profile_pic),
          },
          user2: {
            id: thread.user2._id,
            first_name: thread.user2.first_name,
            last_name: thread.user2.last_name,
            profile_pic: profile_pic(thread.user2.profile_pic),
          },
          me: me,
        };
      });
    },
  });

  const {
    data: messages,
    isLoading: messages_loading,
    reload: reloadConversation,
  } = useQuery<Message[]>("/chat/get_conversation", {
    config: {
      params: {
        id: currentThreadID,
      },
    },
    blockers: [!currentThreadID],
    follow: [currentThreadID],
    filter: (data: any) => {
      return data.conversation;
    },
  });

  const currentThread = threadList?.filter(
    (thread) => thread.id == currentThreadID
  )[0];

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const msg = messageBox.current?.value;
    if (!msg) return;
    try {
      if (currentThreadID === "" || !currentThreadID) return;
      const res = await axios.post("/chat/send_message", {
        id: currentThreadID,
        content: msg,
        date: new Date(),
        to:
          currentThread?.user1.id === user?.id
            ? currentThread?.user2.id
            : currentThread?.user1.id,
        from: user?.id,
      });
      if (res.status === 200) {
        setThreadText({ ...threadText, [currentThreadID]: "" });
        reloadConversation();
        reloadThreadList();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const switchThread = (id: string) => {
    setThreadText({
      ...threadText,
      [currentThreadID]: messageBox.current?.value || "",
    });
    setSearchParams({ id: id });
    currentThreadID = id;
    if (messageBox.current) messageBox.current.value = threadText[id] || "";
  };

  if (threadListLoading || threadList === null) return <Loading />;

  return (
    <div className="flex gap-10">
      <div className="flex flex-col w-1/5 border-r-primary border-r-2 border-opacity-50 overflow-hidden">
        <h2 className="text-3xl p-2 text-accent">Conversations</h2>
        <div className="flex flex-col h-[85vh] overflow-x-hidden overflow-y-auto no-scrollbar">
          {/* conversation list */}
          {threadList.map((thread, idx) => (
            <div
              key={idx}
              className={`card card-compact p-2 shadow-md my-2 cursor-pointer ${
                thread.id === currentThreadID && "bg-secondary"
              }`}
              onClick={() => switchThread(thread.id)}
            >
              <div className="flex p-2">
                <img
                  src={thread.avatar}
                  alt="user"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col ml-2">
                  <h3
                    className="text-lg card-title"
                    // className={`text-lg card-title ${
                    //   thread.last_message_status !== "seen" && "font-bold"
                    // }`}
                  >
                    {thread.name}
                  </h3>
                  <p
                    className="text-sm"
                    // className={`text-sm ${
                    //   thread.last_message_status !== "seen" && "font-bold"
                    // }`}
                  >
                    {thread.last_message && thread.last_message.length > 20
                      ? thread.last_message.slice(0, 20) + "..."
                      : thread.last_message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 relative">
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-3xl p-2 text-accent">Messages</h2>
          <div className="flex flex-col h-[78vh] overflow-x-hidden overflow-y-auto no-scrollbar">
            {/* messages */}
            {messages_loading || !user?.id ? (
              <Loading />
            ) : (
              messages?.map((msg, idx) => (
                <div
                  key={idx}
                  className={` chat ${
                    msg.sender === user?.id ? "chat-end" : "mr-auto chat-start"
                  }`}
                >
                  <div className="chat-image">
                    <img
                      src={
                        msg.sender === currentThread?.user1.id
                          ? currentThread?.user1.profile_pic
                          : currentThread?.user2.profile_pic
                      }
                      alt="user"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  {/* <div className="chat-header">{msg.sender}</div> */}
                  <div
                    className={`chat-bubble ${
                      msg.sender === user?.id
                        ? "chat-bubble-primary"
                        : "chat-bubble-secondary"
                    }`}
                  >
                    <p className="p-1">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <form
          onSubmit={sendMessage}
          className="flex flex-row mt-2 absolute left-4 right-4 bottom-2"
        >
          <IoIosAddCircle className="text-4xl text-accent cursor-pointer translate-y-[20%]" />
          <input
            type="text"
            placeholder="Message"
            ref={messageBox}
            className="input input-bordered bg-transparent mt-auto flex-1 mx-4"
          />
          <input
            type="submit"
            className="btn btn-accent grow-0 w-fit"
            value="send"
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;
