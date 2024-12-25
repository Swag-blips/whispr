import { SignIn as SignInComponent, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

const SignIn = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/");
    } else {
      return;
    }
  }, [userId, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center h-screen justify-center">
        <LuLoader size={24} className="text-[#4b2ec0] animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex items-center h-screen justify-center">
      <SignInComponent
        path="/sign-in"
        appearance={{
          elements: {
            footerAction: { display: "none" },
          },
        }}
      />
    </div>
  );
};

export default SignIn;
