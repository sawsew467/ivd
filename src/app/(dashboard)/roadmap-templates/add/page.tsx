"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

import { RoadmapStep } from "@/features/roadmap-templates/types";
import RoadmapGenerator from "@/features/training-groups/components/roadmap-generator";
import RoadmapStarter from "@/features/training-groups/components/roadmap-starter";

function PageContent() {
  const searchParams = useSearchParams();
  const createBy = searchParams.get("createBy");
  const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);

  const renderRoadmap = () => (
    <div>
      roadmap
      <button onClick={() => setRoadmap(null)}>Reset Roadmap</button>
    </div>
  );

  const renderRoadmapCreator = () => {
    switch (createBy) {
      case null:
        return <RoadmapStarter />;
      case "ai":
        return <RoadmapGenerator userId={null} />;
      default:
        return null; // Handle unexpected cases
    }
  };

  return <>{roadmap ? renderRoadmap() : renderRoadmapCreator()}</>;
}

export default function Page() {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </div>
  );
}
