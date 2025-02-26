import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
