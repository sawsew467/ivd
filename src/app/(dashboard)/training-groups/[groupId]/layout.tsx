"use client";

import { Button } from "@/components/ui/button";
import { MoveRight, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, usePathname, useRouter } from "next/navigation";
import { group } from "@/features/training-groups/data";

const tabs = [
  {
    id: "general",
    label: "General",
  },
  {
    id: "documents",
    label: "Documents",
  },
  {
    id: "roadmap-template",
    label: "Roadmap",
  },
  {
    id: "settings",
    label: "Settings",
  },
];

export default function GroupDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { groupId } = useParams();

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
            <Users className="h-4 w-4" />
            Manage Members
          </Button>
        </div>
      </div>
      {tabs.some((tab) => tab.id === pathname.split("/").pop()) ? (
        <Tabs
          defaultValue="general"
          className="w-full"
          onValueChange={(value) => router.replace(value)}
          value={pathname.split("/").pop()}
        >
          <div className="flex justify-between">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger value={tab.id} key={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="secondary"
              onClick={() => {
                localStorage.setItem("role", "mentee");
                router.push(`/training-groups/${groupId}/mentees/${1}`);
              }}
            >
              My learning space
              <MoveRight />
            </Button>
          </div>

          {children}
        </Tabs>
      ) : (
        children
      )}
    </div>
  );
}
