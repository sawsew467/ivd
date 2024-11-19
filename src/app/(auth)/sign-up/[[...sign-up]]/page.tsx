import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
}
