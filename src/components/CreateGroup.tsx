import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const CreateGroup = () => {
  const users = useQuery(api.chats.getUserChats);
  const createGroupChat = useMutation(api.chats.createGroupChat);
  const [addedUsers, setAddedUsers] = useState<Array<string>>([]);
  const [groupName, setGroupName] = useState("");

  const handleAddUser = (userId: string | undefined) => {
    if (!userId) {
      return;
    }

    if (addedUsers.includes(userId)) {
      return;
    }

    setAddedUsers((prevUsers) => [...prevUsers, userId]);
    console.log(addedUsers);
  };

  const handleCreateGroup = async () => {
    if (!addedUsers.length) {
      return;
    }
    if (!groupName) {
      return;
    }
    try {
      await createGroupChat({ participants: addedUsers, groupName: groupName });
      toast.success("group chat successfully created");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div className="fixed top-0 z-[70]  items-center justify-center flex flex-col h-screen  right-0 left-0 bottom-0 ">
      <div className=" bg-[#12171D] py-6  px-6 rounded-lg w-[433px] ">
        <RxCross2 className="text-white cursor-pointer ml-auto " size={24} />

        <div className="flex flex-col gap-4">
          <label className="text-base font-medium text-left text-white">
            Enter group name
          </label>

          <input
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group Name"
            className="bg-[#1E2126] outline-none text-white px-3 py-3 placeholder:text-xs rounded-lg placeholder:font-medium placeholder:text-[#A4A2A2]"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center mt-4">
          {users?.map((user) => (
            <div
              onClick={() => handleAddUser(user.userId)}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <img
                  src={user.receiver?.photoUrl}
                  alt="user-photo"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <p className="text-white">{user.receiver?.name}</p>
              </div>
              <input
                type="checkbox"
                className="rounded-full  appearance-none size-6 border border-[#9A9A9A]"
              />
            </div>
          ))}

          <button
            onClick={handleCreateGroup}
            className="text-white mt-4 bg-[#928DD3] rounded-lg py-4"
          >
            Create group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
