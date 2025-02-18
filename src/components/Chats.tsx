import { FiPlusCircle } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link, useLocation, useParams } from "react-router-dom";
import useModalStore from "../store/useModalStore";
import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
import { Id } from "../../convex/_generated/dataModel";
import useChatStore from "../store/useChatStore";
import Friends from "./Friends";
import { FaUserGroup } from "react-icons/fa6";
const Chats = () => {
  const { setUser } = useUserStore();

  const userChats = useQuery(api.chats.getUserChats);
  const { setIsOpen } = useModalStore();

  const { id } = useParams();

  const authUser = useQuery(api.users.getAuthUser);
  const getChat = useMutation(api.chats.getChat);

  const { setChat } = useChatStore();

  const handleOpen = () => {
    setIsOpen();
  };

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

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  const { pathname } = useLocation();
  const isFriendRequest = pathname === "/friendRequests";

  return (
    <div
      className={`xl:bg-[#1E2126]  relative bg-[#16191C] xl:sticky xl:right-0 xl:left-0 xl:top-0 xl:bottom-0 ${id || isFriendRequest ? "hidden xl:flex xl:pt-8" : ""}  tracking-[-0.1px] w-full xl:w-[23.888%] flex flex-col gap-8 h-screen px-4 pt-8 "`}
    >
      <div className="flex items-center justify-between">
        <h2 className=" font-semibold text-2xl text-white">Chats</h2>
        <FiPlusCircle onClick={handleOpen} size={24} color="#ffffff" />
      </div>

      <Friends />
      <form className="mt-2">
        <div className="relative">
          <input
            type="text"
            className="w-full h-10 pl-12 text-xs placeholder-[#B6B6B6] rounded-lg bg-[#1E2126] xl:bg-[#16191C] text-white outline-none"
            placeholder="Search"
          />

          <div className="flex absolute top-2 left-3 items-center ">
            <IoSearchOutline size={24} color="#FFFFFF" />
          </div>
        </div>
      </form>

      {userChats?.map((user, index) => (
        <Link
          onClick={() => setCurrentChat(user.chatId)}
          key={index}
          to={`/chat/${user.chatId}`}
        >
          <div className="flex cursor-pointer items-center justify-between">
            <div className="flex justify-center items-center gap-4">
              <div className="relative">
                {user.receiver && (
                  <img
                    src={user.receiver?.photoUrl}
                    alt="profile-img"
                    className=" h-12 w-12 rounded-full object-cover"
                  />
                )}

                {!user.receiver && (
                  <div className="h-12 flex items-center justify-center w-12 bg-gray-600 rounded-full">
                    <FaUserGroup size={24} color="#ffffff" />
                  </div>
                )}
                {user.receiver?.isOnline && (
                  <div className="h-3 w-3 rounded-full absolute bg-green-300 bottom-0  right-0" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-medium text-left text-[#E2E2E2]">
                  {user.receiver?.name || user.chat?.groupName}
                </h4>
                <p className="text-[#A4A2A2] text-xs">
                  {user.chat?.lastMessage ||
                    `Start Chatting with ${user.receiver?.name || user.chat?.groupName}`}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {!userChats?.length && (
        <div className="flex items-center justify-center h-[50vh] flex-col">
          <div>
            <p className="text-white text-center">Your inbox is empty</p>
            <p className=" text-center text-[#A4A2A2]">
              once you start a new conversaton, you’ll see it listed here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
