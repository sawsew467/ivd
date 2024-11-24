"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

function Page() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center mb-4">
      <Avatar className="w-20 h-20 mb-2">
        <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
      </Avatar>
      <p className="text-3xl font-semibold">{user?.fullName}</p>
      <p className="text-md text-muted-foreground">
        {user?.emailAddresses[0]?.emailAddress}
      </p>
    </div>
  );
}

export default Page;
