import avater1 from "./assets/man.png";
import avater2 from "./assets/woman.png";
import TextBox from "@/components/TextBox";
import { IoIosAddCircle } from "react-icons/io";

function Chat() {
  const thread_list = [
    { name: "John Doe", avater: avater1 },
    { name: "Jane Doe", avater: avater2 },
    { name: "John Smith", avater: avater1 },
    { name: "Jane Smith", avater: avater1 },
    { name: "Kevin Doe", avater: avater2 },
    { name: "Kevin Smith", avater: avater2 },
  ];

  const messages = {
    "John Doe": [
      { sender: "John Doe", message: "Hello" },
      { sender: "Kevin Smith", message: "Hi", user: true },
      { sender: "John Doe", message: "How are you?" },
      { sender: "Kevin Smith", message: "I'm good, you?", user: true },
      { sender: "John Doe", message: "I'm good too" },
      { sender: "John Doe", message: "What Now?" },
      { sender: "Kevin Smith", message: "That's great", user: true },
      { sender: "John Doe", message: "Yeah" },
      { sender: "Kevin Smith", message: "Bye", user: true },
    ],
    "Jane Doe": [
      { sender: "John Doe", message: "Hello" },
      { sender: "Kevin Smith", message: "Hi", user: true },
      { sender: "John Doe", message: "How are you?" },
      { sender: "Kevin Smith", message: "I'm good, you?", user: true },
      { sender: "John Doe", message: "I'm good too" },
      { sender: "Kevin Smith", message: "That's great", user: true },
      { sender: "John Doe", message: "Yeah" },
      { sender: "Kevin Smith", message: "Bye", user: true },
    ],
  };
  return (
    <div className="flex gap-10">
      <div className="flex flex-col w-1/5 border-r-primary border-r-2 border-opacity-50 overflow-hidden">
        <h2 className="text-3xl p-2 text-accent">Conversations</h2>
        <div className="flex flex-col h-[85vh] overflow-x-hidden overflow-y-auto no-scrollbar">
          {/* conversation list */}
          {thread_list.map((thread, idx) => (
            <div
              key={idx}
              className={`card card-compact p-2 shadow-md my-2 ${
                idx === 0 && "bg-secondary"
              }`}
            >
              <div className="flex p-2">
                <img
                  src={thread.avater}
                  alt="user"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col ml-2">
                  <h3 className="text-lg card-title">{thread.name}</h3>
                  <p className="text-sm">
                    {messages[thread.name]?.length > 0 &&
                      messages[thread.name][messages[thread.name].length - 1]
                        .message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-3xl p-2 text-accent">Messages</h2>
          <div className="flex flex-col h-[80vh] overflow-x-hidden overflow-y-auto no-scrollbar">
            {/* messages */}
            {messages["John Doe"].map((msg, idx) => (
              <div
                key={idx}
                className={` chat ${
                  msg.user ? "chat-end" : "mr-auto chat-start"
                }`}
              >
                <div className="chat-image">
                  <img
                    src={msg.sender === "John Doe" ? avater1 : avater2}
                    alt="user"
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                {/* <div className="chat-header">{msg.sender}</div> */}
                <div
                  className={`chat-bubble ${
                    msg.user ? "chat-bubble-primary" : "chat-bubble-secondary"
                  }`}
                >
                  <p className="p-1">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row mt-2">
          <IoIosAddCircle className="text-4xl text-accent cursor-pointer" />
          <TextBox
            placeholder="Message"
            className="sticky mt-auto bottom-2 flex-1 mx-4"
          />
          <button className="btn btn-accent grow-0 w-fit">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
