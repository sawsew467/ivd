import MenteeLayout from "@/features/training-groups/components/mentee-layout";

async function layout({ children }: { children: React.ReactNode }) {
  return <MenteeLayout> {children}</MenteeLayout>;
}

export default layout;
