import logo from "/assets/logo.svg";
import { GoHomeFill } from "react-icons/go";
import { BsChatText } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { UserButton } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import CreateGroup from "./CreateGroup";
import Overlay from "./Overlay";
import useGroupStore from "../store/useGroupStore";

const Sidebar = () => {
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const friendRequests = useQuery(api.friends.fetchFriendRequests);
  const updateFriendRequest = useMutation(
    api.friends.updateLatestFriendRequest
  );

  const { setIsOpen } = useGroupStore();

  const delay = (time: number) => {
    return new Promise((res) => {
      setTimeout(res, time);
    });
  };
  const notifyFriendRequest = async () => {
    if (friendRequests === "No friend Requests") {
      return;
    } else if (
      friendRequests &&
      friendRequests[friendRequests.length - 1].toHasRead
    ) {
      return;
    }
    if (friendRequests) {
      toast(
        <div className="flex items-center justify-center">
          <img
            src={friendRequests[friendRequests.length - 1].user?.photoUrl}
            alt="success"
            className="mr-[8px] h-8 w-8 rounded-full"
          />
          <p className="text-xs">
            You received a friend request from{" "}
            {friendRequests[friendRequests.length - 1].user?.name}
          </p>
        </div>,
        {
          duration: 4000,
          style: {
            background: "#333333",
            color: "#ffffff",
            width: "397px",
            height: "56px",
          },
          position: "top-center",
        }
      );
      await delay(4000);
      await updateFriendRequest({
        notificationId: friendRequests[friendRequests.length - 1]._id,
      });
    } else {
      return;
    }
  };
  useEffect(() => {
    notifyFriendRequest();
    return () => toast.dismiss();
  }, [friendRequests]);

  return (
    <aside className="bg-[#12171D]  hidden xl:flex sticky right-0 left-0 top-0 bottom-0 py-6 justify-center w-[8.8888%] h-screen">
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
            <CiCirclePlus
              onClick={setIsOpen}
              size={24}
              className="text-white"
            />
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
