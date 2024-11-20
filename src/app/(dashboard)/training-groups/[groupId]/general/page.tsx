"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import MenteeCard from "@/features/training-groups/components/mentee-card";
import { group } from "@/features/training-groups/data";

export default function GeneralPage() {
  return (
    <TabsContent value="general">
      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Mentors</h2>
          <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {group.members
              ?.filter((member) => member.role === "Mentor")
              ?.map((mentor) => (
                <li
                  key={mentor.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border-[1px]"
                >
                  <Avatar>
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mentor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {mentor.email}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Mentees</h2>
          <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {group.members
              ?.filter((member) => member.role === "Mentee")
              ?.map((mentee) => (
                <MenteeCard mentee={mentee} key={mentee.id} />
              ))}
          </ul>
        </div>
      </div>
    </TabsContent>
  );
}
