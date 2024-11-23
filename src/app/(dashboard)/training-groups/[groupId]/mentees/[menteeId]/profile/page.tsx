"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { group } from "@/features/training-groups/data";
import { useParams } from "next/navigation";

function Page() {
  const { menteeId } = useParams();
  const mentee = group.members?.find((member) => member.id === menteeId);
  return (
    <div className="flex flex-col items-center mb-4">
      <Avatar className="w-20 h-20 mb-2">
        <AvatarImage src={mentee?.avatar} alt={mentee?.name} />
        <AvatarFallback className="w-20 h-20 mb-2">
          {mentee?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <p className="text-3xl font-semibold">{mentee?.name}</p>
      <p className="text-md text-muted-foreground">{mentee?.email}</p>
    </div>
  );
}

export default Page;
