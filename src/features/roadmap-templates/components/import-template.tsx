import { templates } from "@/app/(dashboard)/roadmap-templates/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Import } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Template } from "../types";

function ImportTemplate({
  setTemplate,
}: {
  setTemplate: Dispatch<SetStateAction<Template | null>>;
}) {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-8 text-center">
        Import Roadmap from Your Templates
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{template.subtitle}</p>
              <p className="mt-2">Missions: {template.missionCount}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setTemplate(template)}>
                <Import className="mr-2 h-4 w-4" /> Import
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ImportTemplate;
