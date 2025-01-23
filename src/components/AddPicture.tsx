import { useMutation } from "convex/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import Spinner from "../helpers/Spinner";

type Props = {
  image: string | null;
  isOpen: boolean;
  setSelectedImage: (image: File | null) => void;
  setImage: (image: string | null) => void;
  chatId: string | undefined;
  authUserId: string | null;
  selectedImage: File | null;
  participant1: string;
  participant2: string;
  setIsOpen: (value: boolean) => void;
};

const AddPicture = ({
  image,
  chatId,
  setSelectedImage,
  isOpen,
  selectedImage,
  setImage,
  authUserId,
  participant1,
  participant2,
  setIsOpen,
}: Props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
  const sendMessage = useMutation(api.messages.message);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedImage(null);
    setImage(null);
  };
  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": selectedImage?.type!,
        },
        body: selectedImage,
      });

      const { storageId } = await result.json();

      if (text) {
        await sendMessage({
          chatId: chatId as Id<"chats">,
          message: text,
          receiverId: participant1 === authUserId ? participant2 : participant1,
          format: "image",
          image: storageId,
        });
      }

      setIsOpen(false);
      setSelectedImage(null);
      setImage(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed top-0 z-[70]  items-center justify-center flex flex-col h-screen  right-0 left-0 bottom-0 ">
      <div className={`bg-[#12171D] py-6  px-6 rounded-lg w-[433px] `}>
        <RxCross2
          onClick={handleClose}
          className="text-white cursor-pointer ml-auto mb-6"
          size={24}
        />
        {image && (
          <form className="flex items-center gap-2 flex-col">
            <img src={image} alt="image" className="rounded-lg" />
            <input
              className="bg-[#1E2126] w-full h-12 rounded-lg pl-4 outline-none text-white text-xs placeholder:text-[#A4A2A2] font-medium"
              placeholder="Send a message"
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={handleUploadImage}
              className="bg-[#928DD3] mt-2 text-white flex items-center justify-center py-4 rounded-lg w-full"
            >
              {loading ? <Spinner /> : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPicture;
