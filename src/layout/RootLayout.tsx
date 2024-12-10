import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";
import useUserStoreEffect from "../components/useUserStoreEffect";
import { LuLoader } from "react-icons/lu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { isLoading, isAuthenticated } = useUserStoreEffect();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated]);
  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <LuLoader size={24} className="text-[#4b2ec0] animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative flex items-start w-full">
      <Sidebar />
      <Chats />
      <Outlet />
    </div>
  );
};

export default RootLayout;
