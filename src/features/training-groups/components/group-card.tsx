import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Trash2, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GroupTraining } from "../types";
import { format } from "date-fns";

export const GroupCard = ({
  group,
  handleViewGroup,
  handleDeleteGroup,
}: {
  group: GroupTraining;
  handleViewGroup: () => void;
  handleDeleteGroup: () => void;
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={faker.image.avatar()} />
          <AvatarFallback>GR</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h2
            className="text-xl font-semibold hover:underline cursor-pointer"
            onClick={handleViewGroup}
          >
            {group.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Created on {format(group.createdAt, "dd/MM/yyyy")}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewGroup()}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteGroup()}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm">{group.description}</p>
        {/* <div className="flex items-center mt-4">
          <Users className="mr-2 h-4 w-4" />
          <span className="text-sm">{group.members.length} members</span>
        </div> */}
      </CardContent>
    </Card>
  );
};
