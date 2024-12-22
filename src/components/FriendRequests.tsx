import { useQuery } from "convex/react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { api } from "../../convex/_generated/api";

const FriendRequests = () => {
  const friendRequests = useQuery(api.friends.fetchFriendRequests);

  console.log(friendRequests);
  return (
    <div className="w-full xl:w-[67.2222%] px-4 py-4 flex flex-col">
      <div className="flex items-center justify-center xl:justify-start gap-2">
        <p className="text-white font-semibold">Friends</p>
        <div />
        <p className="text-[#B6B6B6] font-semibold">Online</p>
        <div />
        <p className="text-[#B6B6B6] font-semibold">All</p>
        <div />
        <p className="text-[#B6B6B6] font-semibold">Pending</p>
      </div>
      <div className="flex flex-col gap-4 justify-center mt-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile-img"
              className="h-12 w-12 rounded-full object-cover"
            />
            <h2 className="text-white text-base font-medium">Dwayne carter</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#303238] cursor-pointer size-12 flex items-center justify-center rounded-full">
              <IoCheckmark size={24} color="#34E449" />
            </div>
            <div className="bg-[#303238] cursor-pointer size-12 flex items-center justify-center rounded-full">
              <RxCross2 size={24} color="#F53105" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
