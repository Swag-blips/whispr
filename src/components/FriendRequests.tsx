import { useMutation, useQuery } from "convex/react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";

const FriendRequests = () => {
  const friendRequests = useQuery(api.friends.fetchFriendRequests);
  const acceptFriendRequests = useMutation(api.chats.createUserChats);

  const handleAcceptRequests = async (toBeAddedId: string | undefined) => {
    if (!toBeAddedId) {
      return;
    }
    try {
      await acceptFriendRequests({ toBeAddedId });
      toast.success("You are now friends");
    } catch (error) {
      console.error(error);
    }
  };

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
        {friendRequests !== "No friend Requests" &&
          friendRequests?.map((friend) => (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={friend?.user?.photoUrl}
                  alt="profile-img"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <h2 className="text-white text-base font-medium">
                  {friend?.user?.name}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div
                  onClick={() => handleAcceptRequests(friend.user?.userId)}
                  className="bg-[#303238] cursor-pointer size-12 flex items-center justify-center rounded-full"
                >
                  <IoCheckmark size={24} color="#34E449" />
                </div>
                <div className="bg-[#303238] cursor-pointer size-12 flex items-center justify-center rounded-full">
                  <RxCross2 size={24} color="#F53105" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendRequests;
