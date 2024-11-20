import { useParams, useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Member } from "../types";

function MenteeCard({ mentee }: { mentee: Member }) {
  const router = useRouter();
  const { groupId } = useParams();
  return (
    <li
      key={mentee.id}
      className="flex items-center space-x-4 p-4 border-[1px] rounded-lg cursor-pointer hover:bg-slate-200"
      onClick={() =>
        router.push(`/training-groups/${groupId}/mentees/${mentee.id}`)
      }
    >
      <Avatar>
        <AvatarImage src={mentee.avatar} alt={mentee.name} />
        <AvatarFallback>
          {mentee?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium">{mentee.name}</p>
        <p className="text-sm text-muted-foreground">{mentee.email}</p>
      </div>
    </li>
  );
}

export default MenteeCard;
