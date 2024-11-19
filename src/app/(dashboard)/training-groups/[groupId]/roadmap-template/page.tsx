"use client";

import { TabsContent } from "@/components/ui/tabs";
import ImportTemplate from "@/features/roadmap-templates/components/import-template";
import TemplateEditor from "@/features/roadmap-templates/components/template-editor";
import { Template } from "@/features/roadmap-templates/types";
import { useState } from "react";

function RoadmapTemplatePage() {
  const [template, setTemplate] = useState<Template | null>(null);

  return (
    <div className="">
      <TabsContent value="roadmap-template">
        {!template ? (
          <ImportTemplate setTemplate={setTemplate} />
        ) : (
          <TemplateEditor />
        )}
      </TabsContent>
    </div>
  );
}

export default RoadmapTemplatePage;
