"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-vertical";
import { group } from "@/features/training-groups/data";
import { useParams, usePathname, useRouter } from "next/navigation";

const tabs = [
  {
    id: "roadmap",
    label: "Roadmap",
  },
  {
    id: "quizz",
    label: "Quizz",
  },
];

function MenteeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { menteeId } = useParams();
  const mentee = group.members?.find((member) => member.id === menteeId);
  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <Avatar className="w-20 h-20 mb-2">
          <AvatarImage src={mentee?.avatar} alt={mentee?.name} />
          <AvatarFallback>
            {mentee?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <p className="text-3xl font-semibold">{mentee?.name}</p>
        <p className="text-md text-muted-foreground">{mentee?.email}</p>
      </div>
      <div className="w-full h-[1px] bg-slate-200 mx-auto mb-4" />
      <div className="w-full flex gap-4 items-start">
        <Tabs
          defaultValue="general"
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
        </Tabs>
        <section className="w-full"> {children}</section>
      </div>
    </div>
  );
}

export default MenteeLayout;
