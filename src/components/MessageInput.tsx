import { MdMic } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import useUserStore from "../store/useUserStore";
import { AiOutlinePicture } from "react-icons/ai";
import useChatStore from "../store/useChatStore";
import Overlay from "./Overlay";
import AddPicture from "./AddPicture";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { id: chatId } = useParams();

  const sendMessage = useMutation(api.messages.message);
  const { user: authUser } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { chat } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleImageUploadClick = () => {
    setIsOpen(true);
    fileInputRef.current?.click();
  };

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) {
      return;
    }
    try {
      if (!chatId || !authUser.userId || !message || !chat) {
        return;
      }

      setSending(true);

      await sendMessage({
        message,

        chatId: chatId as Id<"chats">,
        receiverId:
          chat.participant1 === authUser.userId
            ? chat.participant2
            : chat.participant1,
      });

      return;
    } catch (error) {
      console.log(error);
    } finally {
      setMessage("");
      setSending(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    setSelectedImage(file);
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result as string;

      setImage(base64Image);
    };
  };

  return (
    <form
      onSubmit={handleSend}
      className="fixed bottom-0 py-3 px-6 bg-[#16191c] z-10  w-full "
    >
      <div className=" flex items-center  xl:w-[49%]">
        <div className="relative w-full">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className=" w-full  text-xs text-white placeholder:text-xs pl-10 h-14 outline-none bg-[#1E2126]"
            placeholder="Send a message..."
          />
          <MdMic size={24} color="#ffffff" className="absolute top-4 left-2" />
        </div>

        <div className=" bg-[#1E2126]  gap-4 h-14 right-2 pr-4 flex items-center justify-center">
          <input
            type="file"
            hidden
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <CiFaceSmile size={24} color="#ffffff" className="" />
          <AiOutlinePicture
            size={24}
            color="#ffffff"
            onClick={handleImageUploadClick}
            className=""
          />
          <button
            type="submit"
            className=" flex  justify-center items-center gap-4"
          >
            <div className="bg-white px-[10px] py-[4px] rounded-lg">
              <LuSend size={16} color="#000000" />
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          {chat && (
            <>
              <AddPicture
                chatId={chatId}
                setSelectedImage={setSelectedImage}
                setImage={setImage}
                selectedImage={selectedImage}
                participant1={chat.participant1}
                participant2={chat.participant2}
                authUserId={authUser.userId}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                image={image}
              />
              <Overlay />
            </>
          )}
        </>
      )}
    </form>
  );
};

export default MessageInput;
