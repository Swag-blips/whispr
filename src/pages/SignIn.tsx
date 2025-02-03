import { SignIn as SignInComponent } from "@clerk/clerk-react";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignInComponent forceRedirectUrl={"/auth-callback"} />
    </div>
  );
};

export default SignIn;
