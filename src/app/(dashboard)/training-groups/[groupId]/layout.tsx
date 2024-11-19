"use client";

import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "Mentor" | "Mentee";
  avatar: string;
}

interface TrainingGroup {
  id: string;
  name: string;
  description: string;
  members: Member[];
}

// This would typically come from props or a data fetching hook
export const group: TrainingGroup = {
  id: "1",
  name: "Web Development Mastery",
  description: "A comprehensive training program for aspiring web developers.",
  members: [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Mentor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Mentor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Mentee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Mentee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Ethan Hunt",
      email: "ethan@example.com",
      role: "Mentee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
};

export default function GroupDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const handleMembersManagerClick = () => {
    console.log("Members manager clicked");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
          <p className="text-muted-foreground">{group.description}</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-4">
          <Button onClick={handleMembersManagerClick}>
            <Users className="mr-2 h-4 w-4" />
            Manage Members
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="general"
        className="w-full"
        onValueChange={(value) => router.replace(value)}
        value={pathname.split("/").pop()}
      >
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="roadmap-template">Roadmap</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}
