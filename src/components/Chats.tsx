import { FiPlusCircle } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import williamLee from "/assets/william_lee.jpg";
import userChats from "../../userChats.json";
import { useState } from "react";
import { UserChats } from "../types/types";

const Chats = () => {
  const [data, setData] = useState<UserChats[]>(userChats);

  return (
    <div className="bg-[#1E2126] w-[23.888%] flex flex-col gap-8 h-screen px-4 pt-8">
      <div className="flex items-center justify-between">
        <h2 className=" font-semibold text-2xl text-white">Chats</h2>
        <FiPlusCircle size={24} color="#ffffff" />
      </div>

      <form>
        <div className="relative">
          <input
            type="text"
            className="w-full h-10 pl-12 placeholder-[#B6B6B6] rounded-lg bg-[#16191C] text-white outline-none"
            placeholder="Search"
          />

          <div className="flex absolute top-2 left-3 items-center ">
            <IoSearchOutline size={24} color="#FFFFFF" />
          </div>
        </div>
      </form>

      {data.map((userChat) => (
        <div className="flex items-center justify-between">
          <div className="flex justify-center  items-center gap-4">
            <img
              src={userChat.image}
              alt="profile-img"
              className=" h-12 w-12 rounded-full object-cover"
            />

            <div className="flex flex-col gap-2">
              <h4 className="text-base font-medium text-left text-[#E2E2E2]">
                {userChat.firstname}
                {userChat.lastname}
              </h4>
              <p className="text-[#A4A2A2] text-xs">{userChat.lastMessage}</p>
            </div>
          </div>

          <p className="text-xs text-[#8C8A8A] ">
            {userChat.timeOfLastMessage}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Chats;
