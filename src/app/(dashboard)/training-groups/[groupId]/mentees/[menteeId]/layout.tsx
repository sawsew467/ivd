"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-vertical";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  {
    id: "profile",
    label: "Profile",
  },
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
  return (
    <div>
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
