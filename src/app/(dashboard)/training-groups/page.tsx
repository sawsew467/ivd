"use client";

import { useState } from "react";
import { TrainingGroup } from "@/features/training-groups/types";
import { GroupCard } from "@/features/training-groups/components/group-card";
import AddGroupModal from "@/features/training-groups/components/add-group-modal";
import { useRouter } from "next/navigation";
import { useGetAllGroupsQuery } from "@/store/queries/groups";

export default function GroupsPage() {
  const router = useRouter();

  const { data, refetch } = useGetAllGroupsQuery(
    "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd"
  );

  const [groups, setGroups] = useState<TrainingGroup[]>([
    {
      id: "1",
      name: "Frontend Development",
      description:
        "Learn React, Next.js, and modern frontend development practices. This group focuses on building responsive and interactive web applications.",
      members: ["Alice", "Bob", "Charlie"],
      createdAt: new Date("2023-01-15"),
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Backend Engineering",
      description:
        "Explore server-side technologies, databases, and API development. This group covers Node.js, Express, and database management systems.",
      members: ["David", "Eve", "Frank"],
      createdAt: new Date("2023-02-20"),
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]);

  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  const handleCreateGroup = (newGroup: TrainingGroup) => {
    if (newGroup.name && newGroup.description) {
      const group: TrainingGroup = {
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description,
        members: newGroup.members || [],
        createdAt: new Date(),
        avatar: "/placeholder.svg?height=100&width=100",
      };
      setGroups([group, ...groups]);
      setIsNewGroupModalOpen(false);
    }
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter((group) => group.id !== id));
  };

  const handleViewGroup = (id: string) => {
    router.push(`/training-groups/${id}/general`);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Training Group Manager</h1>
        <AddGroupModal
          isOpen={isNewGroupModalOpen}
          setIsOpen={setIsNewGroupModalOpen}
          handleCreateGroup={handleCreateGroup}
          refetch={refetch}
        />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data?.map((group) => (
          <GroupCard
            group={group}
            key={group.id}
            handleViewGroup={() => handleViewGroup(group.id)}
            handleDeleteGroup={() => handleDeleteGroup(group.id)}
          />
        ))}
      </div>
    </div>
  );
}
