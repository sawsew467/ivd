"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { useGetGroupByIdQuery } from "@/store/queries/groups";
import { useParams } from "next/navigation";
import MenteeCard from "@/features/training-groups/components/mentee-card";

export default function GeneralPage() {
  const { groupId } = useParams();
  const { data } = useGetGroupByIdQuery({
    groupId: groupId,
    projectId: "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd",
  });
  console.log("🚀 ~ GeneralPage ~ data:", data);
  return (
    <TabsContent value="general">
      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Mentors</h2>
          <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data?.mentors?.map((mentor: any) => (
              <li
                key={mentor?.id}
                className="flex items-center space-x-4 p-4 rounded-lg border-[1px]"
              >
                <Avatar>
                  <AvatarImage src={mentor?.avatarUrl} alt={mentor?.fullName} />
                </Avatar>
                <div>
                  <p className="font-medium">{mentor?.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {mentor?.email}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Mentees</h2>
          <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data?.mentees?.map((mentee: any) => (
              <MenteeCard mentee={mentee} key={mentee.id} />
            ))}
          </ul>
        </div>
      </div>
    </TabsContent>
  );
}
