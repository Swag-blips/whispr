import profileImg from "/assets/john_doe.jpg";
import { FiVideo } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import useChatStore from "../store/useChatStore";

const ChatHeader = () => {
  const { chat, loading } = useChatStore();
  return (
    <header className="h-20 px-6 py-4  sticky bg-[#16191c] z-20 top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={!loading && chat ? chat[0].receiver?.photoUrl : profileImg}
            alt="profile-img"
            className="w-12 object-cover h-12 rounded-full"
          />
          <div className="flex flex-col gap-2 items-start">
            <h4 className="font-medium text-white text-base">
              {!loading && chat ? chat[0].receiver?.name : "Anonymous"}
            </h4>
            <p className="text-xs text-[#A4A2A2] font-medium">online</p>
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
