import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import RootLayout from "./layout/RootLayout";
import SelectChat from "./components/SelectChat";
import Chat from "./components/Chat";
import FriendRequests from "./components/FriendRequests";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <SelectChat />,
        },
        {
          path: "/chat/:id",
          element: <Chat />,
        },
        {
          path: "/friendRequests",
          element: <FriendRequests />,
        },
      ],
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/auth-callback",
      element: <AuthCallback />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
