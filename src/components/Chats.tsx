import { FiPlusCircle } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Chats = () => {
  const users = useQuery(api.users.users);

  const { userId } = useAuth();
  const { id } = useParams();

  return (
    <div
      className={`xl:bg-[#1E2126] bg-[#16191C] xl:sticky xl:right-0 xl:left-0 xl:top-0 xl:bottom-0 ${id ? "hidden xl:flex xl:pt-8" : ""}  tracking-[-0.1px] w-full xl:w-[23.888%] flex flex-col gap-8 h-screen px-4 pt-8 "`}
    >
      <div className="flex items-center justify-between">
        <h2 className=" font-semibold text-2xl text-white">Chats</h2>
        <FiPlusCircle size={24} color="#ffffff" />
      </div>

      <form>
        <div className="relative">
          <input
            type="text"
            className="w-full h-10 pl-12 placeholder-[#B6B6B6] rounded-lg bg-[#1E2126] xl:bg-[#16191C] text-white outline-none"
            placeholder="Search"
          />

          <div className="flex absolute top-2 left-3 items-center ">
            <IoSearchOutline size={24} color="#FFFFFF" />
          </div>
        </div>
      </form>

      {users?.map((user, index) => (
        <Link key={index} to={`/chat/${[userId, user.userId].sort().join("")}`}>
          <div className="flex cursor-pointer items-center justify-between">
            <div className="flex justify-center items-center gap-4">
              <img
                src={user.photoUrl}
                alt="profile-img"
                className=" h-12 w-12 rounded-full object-cover"
              />

              <div className="flex flex-col gap-2">
                <h4 className="text-base font-medium text-left text-[#E2E2E2]">
                  {user.name}
                </h4>
                <p className="text-[#A4A2A2] text-xs">Hello there!</p>
              </div>
            </div>

            <p className="text-xs text-[#8C8A8A] ">12:40</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Chats;
