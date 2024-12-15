import { FiPlusCircle } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import useModalStore from "../store/useModalStore";
import useUserStore from "../store/useUserStore";
import { useEffect } from "react";

const Chats = () => {
  const userChats = useQuery(api.users.getUserChats);
  const { setIsOpen } = useModalStore();
  const { userId } = useAuth();
  const { id } = useParams();

  const authUser = useQuery(api.users.getAuthUser);

  const { setUser } = useUserStore();

  const handleOpen = () => {
    setIsOpen();
  };

  const setCurrentChat = () => {
    
  }

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  return (
    <div
      className={`xl:bg-[#1E2126]  relative bg-[#16191C] xl:sticky xl:right-0 xl:left-0 xl:top-0 xl:bottom-0 ${id ? "hidden xl:flex xl:pt-8" : ""}  tracking-[-0.1px] w-full xl:w-[23.888%] flex flex-col gap-8 h-screen px-4 pt-8 "`}
    >
      <div className="flex items-center justify-between">
        <h2 className=" font-semibold text-2xl text-white">Chats</h2>
        <FiPlusCircle onClick={handleOpen} size={24} color="#ffffff" />
      </div>

      <form>
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
        <Link key={index} to={`/chat/${user.chatId}`}>
          <div className="flex cursor-pointer items-center justify-between">
            <div className="flex justify-center items-center gap-4">
              <img
                src={user.receiver?.photoUrl}
                alt="profile-img"
                className=" h-12 w-12 rounded-full object-cover"
              />

              <div className="flex flex-col gap-2">
                <h4 className="text-base font-medium text-left text-[#E2E2E2]">
                  {user.receiver?.name}
                </h4>
                <p className="text-[#A4A2A2] text-xs">
                  {user.lastMessage || "Get started Chatting!"}
                </p>
              </div>
            </div>

            {user.lastMessageTime > 0 && (
              <p className="text-xs text-[#8C8A8A] ">12:40</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Chats;
