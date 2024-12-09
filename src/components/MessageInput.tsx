import { MdMic } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const { id } = useParams();

  const sendMessage = useMutation(api.messages.message);
  const { userId } = useAuth();

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!id || !userId) {
        return;
      }
      await sendMessage({
        message,
        senderId: userId,
        conversationKey: id,
        receiverId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setMessage("");
    }
  };

  useEffect(() => {
    const user1Id = id?.substring(0, 32);
    const user2Id = id?.substring(32, 64);
    const usersArray = [user1Id, user2Id];

    const receiver = usersArray
      .filter((user) => {
        return user !== userId;
      })
      .join("");
    setReceiverId(receiver);
  }, [id]);
  return (
    <form
      onSubmit={handleSend}
      className="fixed bg-[#16191C] bottom-0 mb-6 w-[86.5%] mr-[24px]"
    >
      <div className="w-[inherit] relative">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="w-[inherit] text-white placeholder:text-xs pl-10 h-14 outline-none bg-[#1E2126] rounded-lg"
          placeholder="Send a message..."
        />
        <MdMic size={24} color="#ffffff" className="absolute top-4 left-2" />

        <button
          type="submit"
          className="absolute right-[15%] top-4 flex justify-center items-center gap-4"
        >
          <CiFaceSmile size={24} color="#ffffff" className="" />
          <div className="bg-white px-[10px] py-[4px] rounded-lg">
            <LuSend size={16} color="#000000" />
          </div>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
