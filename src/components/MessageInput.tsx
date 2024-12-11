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
      if (!id || !userId || !message) {
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
      className="fixed bottom-0 py-2 px-6 bg-[#16191c] z-10  w-full "
    >
      <div className=" flex items-center  xl:w-[67%]">
        <div className="relative w-full">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className=" w-full text-xs text-white placeholder:text-xs pl-10 h-14 outline-none bg-[#1E2126]"
            placeholder="Send a message..."
          />
          <MdMic size={24} color="#ffffff" className="absolute top-4 left-2" />
        </div>

        <div className=" bg-[#1E2126] h-14 right-2 pr-6 flex items-center justify-center">
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
