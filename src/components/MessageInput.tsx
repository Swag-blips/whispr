import { MdMic } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import useUserStore from "../store/useUserStore";
import useChatStore from "../store/useChatStore";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { id } = useParams();

  const sendMessage = useMutation(api.messages.message);
  const { user: authUser } = useUserStore();
  const { chat } = useChatStore();

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) {
      return;
    }
    try {
      if (!id || !authUser._id || !message || !chat) {
        return;
      }

      setSending(true);

      await sendMessage({
        message,
        senderId: authUser._id,
        chatId: id as Id<"chats">,
        receiverId:
          chat.participant1 === authUser._id
            ? chat.participant2
            : chat.participant1,
      });

      return;
    } catch (error) {
      console.log(error);
    } finally {
      setMessage("");
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="fixed bottom-0 py-2 px-6 bg-[#16191c] z-10  w-full "
    >
      <div className=" flex items-center  xl:w-[50%]">
        <div className="relative w-full">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className=" w-full rounded-lg text-xs text-white placeholder:text-xs pl-10 h-14 outline-none bg-[#1E2126]"
            placeholder="Send a message..."
          />
          <MdMic size={24} color="#ffffff" className="absolute top-4 left-2" />
        </div>

        <div className=" bg-[#1E2126] rounded-lg h-14 right-2 pr-6 flex items-center justify-center">
          <button
            type="submit"
            className=" flex  justify-center items-center gap-4"
          >
            <CiFaceSmile size={24} color="#ffffff" className="" />
            <div className="bg-white px-[10px] py-[4px] rounded-lg">
              <LuSend size={16} color="#000000" />
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
