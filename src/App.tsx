import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },

    {
      path: "/sign-in/sso-callback",
      element: (
        <AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/"} />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
