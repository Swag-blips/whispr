import profileImg from "/assets/john_doe.jpg";
import { FiVideo } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

const ChatHeader = () => {
  return (
    <header className="h-20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profileImg}
            alt="profile-img"
            className="w-12 object-cover h-12 rounded-full"
          />
          <div className="flex flex-col gap-2 items-start">
            <h4 className="font-medium text-white text-base">John Doe</h4>
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
