import { useMutation, useQuery } from "convex/react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { Id } from "../../convex/_generated/dataModel";
import { useState } from "react";
import Spinner from "../helpers/Spinner";

const FriendRequests = () => {
  const friendRequests = useQuery(api.friends.fetchFriendRequests);
  const acceptFriendRequest = useMutation(api.chats.createUserChats);
  const rejectFriendRequest = useMutation(api.friends.handleRejectRequest);
  const [loading, setLoading] = useState(false);

  const handleAcceptRequests = async (
    toBeAddedId: string | undefined,
    friendRequestId: Id<"friendRequests">
  ) => {
    if (!toBeAddedId || !friendRequestId || loading) {
      return;
    }
    setLoading(true);
    try {
      await acceptFriendRequest({ toBeAddedId, friendRequestId });
      toast.success("You are now friends");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (friendRequestId: Id<"friendRequests">) => {
    try {
      if (!friendRequestId || loading) {
        return;
      }
      setLoading(true);
      await rejectFriendRequest({ friendRequestId });
      toast.success("friend request rejected");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
                  role="button"
                  onClick={() =>
                    handleAcceptRequests(friend.user?.userId, friend._id)
                  }
                  className="bg-[#303238] cursor-pointer size-12 flex items-center justify-center rounded-full"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <IoCheckmark size={24} color="#34E449" />
                  )}
                </div>
                <div
                  role="button"
                  onClick={() => handleRejectRequest(friend._id)}
                  className="bg-[#303238] cursor-pointer size-12 flex items-center justify-center rounded-full"
                >
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
