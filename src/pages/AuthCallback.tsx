import { useUser } from "@clerk/clerk-react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

type Props = {};

const AuthCallback = (props: Props) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation(api.users.store);
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return;
    }
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }
    createUser();

    navigate("/");

    return () => setUserId(null);
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, storeUser, user?.id]);
  return (
    <div className="flex items-center h-screen justify-center">
      <LuLoader size={24} className="text-[#4b2ec0] animate-spin" />
    </div>
  );
};

export default AuthCallback;
