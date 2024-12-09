import Chats from "../components/Chats";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import useUserStoreEffect from "../components/useUserStoreEffect";

const Home = () => {
  const { isLoading, isAuthenticated } = useUserStoreEffect();

  return (
    <div className="flex">
      <Sidebar />
      <Chats />
      <Chat />
    </div>
  );
};

export default Home;
