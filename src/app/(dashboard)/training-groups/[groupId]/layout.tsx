"use client";

import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { group } from "@/features/training-groups/data";

const tabs = [
  {
    id: "general",
    label: "General",
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
      {tabs.some((tab) => tab.id === pathname.split("/").pop()) ? (
        <Tabs
          defaultValue="general"
          className="w-full"
          onValueChange={(value) => router.replace(value)}
          value={pathname.split("/").pop()}
        >
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger value={tab.id} key={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {children}
        </Tabs>
      ) : (
        children
      )}
    </div>
  );
}
