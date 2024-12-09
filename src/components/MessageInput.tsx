import { MdMic } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { LuSend } from "react-icons/lu";

const MessageInput = () => {
  return (
    <form className="fixed bg-[#16191C] bottom-0 mb-6 w-[86.5%] mr-[24px]">
      <div className="w-[inherit] relative">
        <input
          className="w-[inherit] text-white placeholder:text-xs pl-10 h-14 outline-none bg-[#1E2126] rounded-lg"
          placeholder="Send a message..."
        />
        <MdMic size={24} color="#ffffff" className="absolute top-4 left-2" />

        <div className="absolute right-[15%] top-3 flex justify-center items-center gap-4">
          <CiFaceSmile size={24} color="#ffffff" className="" />
          <div className="bg-white px-[10px] py-[4px] rounded-lg">
            <LuSend size={16} color="#000000" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
