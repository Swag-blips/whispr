import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  const updateIsOnline = useMutation(api.users.updateUserStatus);
  const updateNetworkStatus = async () => {
    setIsOnline(navigator.onLine);

    await updateIsOnline({ status: isOnline });
  };

  useEffect(() => {
    window.addEventListener("load", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("load", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, [navigator.onLine]);

  return { isOnline };
};
