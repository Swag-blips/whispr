import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";
import useStoreUserEffect from "../hooks/useUserStoreEffect";
import { LuLoader } from "react-icons/lu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useModalStore from "../store/useModalStore";
import AddUserModal from "../components/AddUserModal";
import Overlay from "../components/Overlay";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import useGroupStore from "../store/useGroupStore";
import CreateGroup from "../components/CreateGroup";

const RootLayout = () => {
  const { isLoading, isAuthenticated } = useStoreUserEffect();
  const { isOpen, setIsOpen } = useModalStore();
  const navigate = useNavigate();
  const { isOnline } = useNetworkStatus();

  const { isOpen: isGroupOpen } = useGroupStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, isLoading]);

  const handleIsOpen = () => {
    console.log(isOpen);
    if (isOpen) {
      setIsOpen();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <LuLoader size={24} className="text-[#4b2ec0] animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative  tracking-[-0.6px] flex-col xl:flex-row flex w-full">
      <Navbar />
      <Sidebar />
      <Chats />

      {isOpen && (
        <div>
          <div className="pointer-events-auto" onClick={handleIsOpen}>
            <Overlay />
          </div>
          <AddUserModal />
        </div>
      )}
      {isGroupOpen && (
        <>
          <CreateGroup />
          <Overlay />
        </>
      )}
      <Outlet />
    </div>
  );
};

export default RootLayout;
