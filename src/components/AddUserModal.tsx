import { CiSearch } from "react-icons/ci";

const AddUserModal = () => {
  return (
    <div className="fixed top-0 flex z-[70]  items-center justify-center h-screen  right-0 left-0 bottom-0 ">
      <div className="bg-[#12171D] py-6 px-6 rounded-lg w-[433px] ">
        <div className="flex items-center gap-4">
          <input
            className="bg-[#1E2126] w-full h-12 rounded-lg pl-4 outline-none text-white text-xs placeholder:text-[#A4A2A2] font-medium"
            placeholder="type a user's name"
          />
          <div className="bg-[#8C6EC8] flex items-center justify-center rounded-full w-14 h-12">
            <CiSearch size={24} color="#ffffff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
