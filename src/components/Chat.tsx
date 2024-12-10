import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="w-[67.22222%] relative flex flex-col">
      <ChatHeader />
      <Messages />
    </div>
  );
};

export default Chat;
