import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="xl:w-[67.22222%] w-full relative flex flex-col">
      <ChatHeader />
      <Messages />
    </div>
  );
};

export default Chat;
