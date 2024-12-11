import logo from "/assets/logo.svg";
import { GoHomeFill } from "react-icons/go";
import { BsChatText } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

import { UserButton } from "@clerk/clerk-react";

const Sidebar = () => {
  return (
    <aside className="bg-[#12171D] hidden xl:flex sticky right-0 left-0 top-0 bottom-0 py-6 justify-center w-[8.8888%] h-screen">
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col items-center gap-12">
          <figure>
            <img src={logo} alt="logo" />
          </figure>

          <div className="flex flex-col items-center gap-8">
            <GoHomeFill size={30} className="text-white" />
            <BsChatText size={24} className="text-white" />
            <CgProfile size={24} className="text-white" />
            <IoSettingsOutline size={24} className="text-white" />
          </div>
        </div>

        <figure>
          <UserButton />
        </figure>
      </div>
    </aside>
  );
};

export default Sidebar;
