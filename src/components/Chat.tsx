import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import useChatStore from "../store/useChatStore";
import { Id } from "../../convex/_generated/dataModel";
import { useParams } from "react-router-dom";
import ChatInfo from "./ChatInfo";

const Chat = () => {
  const getChat = useMutation(api.chats.getChat);

  const { id: chatId } = useParams();
  const setCurrentChat = async (chatId: Id<"chats">) => {
    try {
      const chat = await getChat({ chatId });

      if (chat) {
        setChat(chat);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { setChat } = useChatStore();
  useEffect(() => {
    setCurrentChat(chatId as Id<"chats">);
  }, [chatId, getChat]);

  return (
    <>
      <div className="xl:w-[52%] w-full relative flex flex-col">
        <ChatHeader />
        <Messages />
      </div>
      <div className="xl:w-[17.2222%] hidden relative xl:block  ">
        <ChatInfo />
      </div>
    </>
  );
};

export default Chat;
