import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  image: string | null;
  isOpen: boolean
  setIsOpen: (value:boolean) => void
};

const AddPicture = ({ image, isOpen, setIsOpen }: Props) => {
  const [text, setText] = useState("");
  return (
    <div className="fixed top-0 z-[70]  items-center justify-center flex flex-col h-screen  right-0 left-0 bottom-0 ">
      <div className={`bg-[#12171D] py-6  px-6 rounded-lg w-[433px] `}>
      <RxCross2 onClick={() => setIsOpen(false)}  className="text-white ml-auto mb-6" size={24}/>
        {image && (
           <div className="flex items-center gap-2 flex-col">
            <img src={image} alt="image" className="rounded-lg" />
            <input
              className="bg-[#1E2126] w-full h-12 rounded-lg pl-4 outline-none text-white text-xs placeholder:text-[#A4A2A2] font-medium"
              placeholder="type a message"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPicture;
