import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import FriendsSkeleton from "../helpers/FriendsSkeleton";


type Props = {
  friendLoaders: Array<number>;
  availableFriends: boolean;
  loading: boolean;

};

const Friends = ({ availableFriends, loading, friendLoaders }: Props) => {
  const friends = useQuery(api.chats.getUserChats);

  return (
    <div className="flex items-center gap-4 xl:gap-6 no-scrollbar overflow-auto">
      {!availableFriends && (
        <p className="text-white flex items-center justify-center">
          View online users here
        </p>
      )}
      {friends
        ?.filter((users) => users.receiver?.isOnline === true)
        .map((user) => (
          <div className="flex relative justify-center flex-col gap-2">
            <img
              src={user.receiver?.photoUrl}
              alt="profile-img"
              className="size-12 rounded-full object-cover"
            />
            <p className="text-white xl:text-base text-xs text-center">
              {user.receiver?.name}
            </p>
            <div className="h-3 w-3 rounded-full absolute bg-green-300 top-0  right-2" />
          </div>
        ))}
      {loading && (
        <div className="flex items-center justify-center gap-2">
          {friendLoaders.map(() => (
            <FriendsSkeleton />
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
