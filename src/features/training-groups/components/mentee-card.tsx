/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useRouter } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

function MenteeCard({ mentee }: { mentee: any }) {
  const router = useRouter();
  const { groupId } = useParams();

  return (
    <li
      key={mentee?.id}
      className="flex items-center space-x-4 p-4 border-[1px] rounded-lg cursor-pointer hover:bg-slate-200"
      onClick={() => {
        localStorage.setItem("role", "mentor");
        router.push(`/training-groups/${groupId}/mentees/${mentee?.id}`);
      }}
    >
      <Avatar>
        <AvatarImage src={mentee?.avatarUrl} alt={mentee?.fullName} />
      </Avatar>
      <div className="flex-1">
        <p className="font-medium">{mentee?.fullName}</p>
        <p className="text-sm text-muted-foreground">{mentee?.email}</p>
      </div>
    </li>
  );
}

export default MenteeCard;
