import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Toaster } from "react-hot-toast";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Toaster />
        <App />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </StrictMode>
);
