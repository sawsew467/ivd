import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { TrainingGroup } from "../types";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAddNewGroupMutation } from "@/store/queries/groups";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." }),
});

interface AddGroupModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleCreateGroup: (group: TrainingGroup) => void;
  refetch: () => void;
}

function AddGroupModal({ isOpen, setIsOpen, refetch }: AddGroupModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  const { isSubmitting } = form.formState;

  const [addNewGroup] = useAddNewGroupMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await addNewGroup({
        name: values.name,
        description: values.description,
        projectId: "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd",
      }).unwrap();
      refetch();
      console.log("🚀 ~ onSubmit ~ res:", res);
      // const newGroup: TrainingGroup = {
      //   id: faker.string.uuid(),
      //   name: values.name,
      //   description: values.description,
      //   members: [],
      //   createdAt: new Date(),
      //   avatar: "/placeholder.svg?height=100&width=100",
      // };

      // handleCreateGroup(newGroup);
      toast.success("Group created successfully!");
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to create group. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Training Group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter group name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a unique name for the group.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the group"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details about the purpose of this group.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Group"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddGroupModal;
