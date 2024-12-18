import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  const updateIsOnline = useMutation(api.users.updateUserStatus);
  

  const handleVisibilityChange = async () => {

    setIsOnline(true)
    if(document.visibilityState === "visible"){
     setIsOnline(false)
    }else{
  setIsOnline(true)
    }
   updateIsOnline({status:isOnline})
  }



  useEffect(() => {
   document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [document.hidden])

  return { isOnline };
};
