import { useMutation } from "convex/react";
import { CiSearch } from "react-icons/ci";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { User } from "../types/types";
import { BiPlus } from "react-icons/bi";
import Spinner from "../helpers/Spinner";
import useUserStore from "../store/useUserStore";
import toast from "react-hot-toast";

const AddUserModal = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User[] | "No user found">();

  const getUser = useMutation(api.users.getUser);

  const sendFriendRequest = useMutation(api.friends.sendFriendRequest);
  const { user: authUser } = useUserStore();

  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!name) {
      return;
    }
    try {
      const user = await getUser({ name });

      setUser(user);
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (toBeAddedId: string) => {
    if (!authUser._id) {
      return;
    }
    try {
      await sendFriendRequest({ to: toBeAddedId });
      toast.success("Request sent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 z-[70]  items-center justify-center flex flex-col h-screen  right-0 left-0 bottom-0 ">
      <div className={`bg-[#12171D] py-6  px-6 rounded-lg w-[433px] `}>
        <div className="flex items-center gap-4">
          <input
            className="bg-[#1E2126] w-full h-12 rounded-lg pl-4 outline-none text-white text-xs placeholder:text-[#A4A2A2] font-medium"
            placeholder="type a user's name"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-[#8C6EC8] flex items-center justify-center rounded-full w-14 h-12"
          >
            {loading ? <Spinner /> : <CiSearch size={24} color="#ffffff" />}
          </button>
        </div>

        {user &&
          user !== "No user found" &&
          user.map((user, index) => (
            <div key={index} className="flex  mt-12  justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={user.photoUrl}
                  alt="profile-photo"
                  className=" rounded-full w-12 h-12 object-cover"
                />
                <p className="text-base font-medium text-white">{user.name}</p>
              </div>

              <button
                onClick={() => handleAddUser(user.userId)}
                className="bg-[#8C6EC8] flex items-center justify-center rounded-full w-12 h-12"
              >
                <BiPlus size={24} color="#ffffff" />
              </button>
            </div>
          ))}
        {user === "No user found" && <p>No user with the matching name</p>}
      </div>
    </div>
  );
};

export default AddUserModal;
