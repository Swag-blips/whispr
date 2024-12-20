import { FiVideo } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import useChatStore from "../store/useChatStore";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { useParams } from "react-router-dom";
import { User } from "../types/types";

const ChatHeader = () => {
  const { chat } = useChatStore();
  const { user: authUser } = useUserStore();
  const { id } = useParams();
  const [currentChatUser, setCurrentChatUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);
  const chatUser = useMutation(api.chats.getChatUser);

  const getChatUser = async () => {
    setLoading(true);
    try {
      if (!chat || !authUser) {
        return;
      }
      const user = await chatUser({
        userId:
          chat?.participant1 === authUser._id
            ? chat.participant2
            : chat?.participant1,
      });

      setCurrentChatUser(user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatUser();
  }, [id, chat]);

  return (
    <header className="h-20 px-6 py-4  sticky bg-[#16191c] z-20 top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={currentChatUser?.photoUrl}
            alt="profile-img"
            className="w-12 object-cover h-12 rounded-full"
          />
          <div className="flex flex-col gap-2 items-start">
            <h4 className="font-medium text-white text-base">
              {currentChatUser?.name}
            </h4>
            {currentChatUser?.isOnline && (
              <p className="text-xs text-green-500 font-medium">online</p>
            )}
          </div>
        </div>

        <div className=" flex items-center gap-4">
          <FiVideo size={24} color="#ffffff" />
          <IoCallOutline size={24} color="#ffffff" />
          <IoIosMore size={24} color="#ffffff" />
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
