import Chats from "../components/Chats";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import useUserStoreEffect from "../components/useUserStoreEffect";
import { LuLoader } from "react-icons/lu";

const Home = () => {
  const { isLoading, isAuthenticated } = useUserStoreEffect();

  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <LuLoader size={24} className="text-[#4b2ec0] animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex">
      <Sidebar />
      <Chats />
      <Chat />
    </div>
  );
};

export default Home;
