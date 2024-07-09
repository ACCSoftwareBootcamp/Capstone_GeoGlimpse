import React from "react";
import { Route, Routes } from "react-router-dom";
import Plan from "./components/Plan";
import Header from "./components/Header";
import About from "./components/About";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
} from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log(
  "Clerk Publishable Key:",
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
);

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <SignedIn>
              <Plan />
            </SignedIn>
          }
        />
        <Route
          path="/sign-in/*"
          element={
            <SignedOut>
              <SignIn path="/" routing="path" signUpUrl="/sign-up" />
            </SignedOut>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </ClerkProvider>
  );
}

export default App;
