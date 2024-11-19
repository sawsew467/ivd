import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

function HomePage() {
  return (
    <div>
      HomePage
      <Link href={"/users"}>
        <span>{"/Users"}</span>
      </Link>
    </div>
  );
}

export default HomePage;
