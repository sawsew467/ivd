"use client";

import React from "react";
import { group } from "../layout";
import { TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GeneralPage() {
  return (
    <TabsContent value="general">
      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Mentors</h2>
          <ul className="grid grid-cols-3 gap-6">
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
          <ul className="grid grid-cols-3 gap-6">
            {group.members
              ?.filter((member) => member.role === "Mentee")
              ?.map((mentee) => (
                <li
                  key={mentee.id}
                  className="flex items-center space-x-4 p-4 border-[1px] rounded-lg"
                >
                  <Avatar>
                    <AvatarImage src={mentee.avatar} alt={mentee.name} />
                    <AvatarFallback>
                      {mentee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mentee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {mentee.email}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </TabsContent>
  );
}
