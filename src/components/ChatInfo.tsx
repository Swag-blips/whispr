import { useEffect, useState } from "react";
import { User } from "../types/types";
import useUserStore from "../store/useUserStore";
import { useParams } from "react-router-dom";
import useChatStore from "../store/useChatStore";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const ChatInfo = () => {
  const [currentChatUser, setCurrentChatUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);
  const { chat } = useChatStore();
  const { user: authUser } = useUserStore();
  const chatUser = useMutation(api.chats.getChatUser);
  const { id } = useParams();

  const getChatUser = async () => {
    setLoading(true);
    console.log(loading);
    try {
      if (!chat || !authUser) {
        return;
      }
      const user = await chatUser({
        userId:
          chat?.participant1 === authUser.userId
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
    <div className="sticky h-screen top-0  right-4  bottom-0 flex-col mt-8 ">
      <div className="flex flex-col items-center gap-4">
        <img
          src={currentChatUser?.photoUrl}
          alt="profile-img"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex flex-col text-center justify-center">
          <h2 className="text-white text-base font-medium ">
            {currentChatUser?.name}
          </h2>
          {/* <p className="text-green-500 text-xs">online</p> */}
        </div>
      </div>

      <div className="px-4 mt-8">
        <h2 className="text-base font-medium text-white">Media Shared</h2>
        <div className="grid grid-cols-2 mt-4 gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            className="rounded-lg h-[88px] w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg h-[88px] w-full object-cover"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg h-[88px] w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg h-[88px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
