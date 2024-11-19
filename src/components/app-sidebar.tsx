"use client";

import * as React from "react";
import {
  AudioWaveform,
  Book,
  ChartNoAxesGantt,
  Command,
  GalleryVerticalEnd,
  PieChart,
  User,
  Users,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Project 1",
      logo: GalleryVerticalEnd,
    },
    {
      name: "Project 2",
      logo: AudioWaveform,
    },
    {
      name: "Project 3",
      logo: Command,
    },
  ],
  platform: [
    {
      title: "Users",
      url: "users",
      icon: User,
    },
    {
      title: "Data",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Documents",
          url: "/documents",
        },
        {
          title: "History Tasks",
          url: "/history-tasks",
        },
        {
          title: "Source Code",
          url: "/source-code",
        },
        {
          title: "CV",
          url: "/cv",
        },
      ],
    },
    {
      title: "Training groups",
      url: "/training-groups",
      icon: Users,
    },
    {
      title: "Roadmap Templates",
      url: "/roadmap-templates",
      icon: ChartNoAxesGantt,
    },
  ],
  training: [
    {
      title: "Training group",
      url: "/training-group",
      icon: Users,
    },
    {
      title: "Roadmap",
      url: "/roadmap",
      icon: AudioWaveform,
    },
    {
      title: "Study",
      url: "/study",
      icon: Book,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.platform} name={"Platform"} />
        <NavMain items={data.training} name={"Training"} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
