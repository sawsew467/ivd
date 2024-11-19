import { Edit, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Template } from "../types";

type TemplateCardProps = {
  template: Template;
  onEdit: (id: number, updatedData: Partial<Omit<Template, "id">>) => void;
  onDelete: (id: number) => void;
};

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onEdit,
  onDelete,
}) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{template.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-500">{template.subtitle}</p>
      <p className="mt-2 text-sm font-medium">
        Missions: {template.missionCount}
      </p>
    </CardContent>
    <CardFooter className="justify-end space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              onEdit(template.id, {
                title: formData.get("title") as string,
                subtitle: formData.get("subtitle") as string,
              });
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                name="title"
                defaultValue={template.title}
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-gray-700"
              >
                Subtitle
              </label>
              <Input
                id="subtitle"
                name="subtitle"
                defaultValue={template.subtitle}
                className="mt-1"
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Button variant="outline" size="sm" onClick={() => onDelete(template.id)}>
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </CardFooter>
  </Card>
);
