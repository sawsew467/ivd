import { redirect } from "next/navigation";

function page({ params }: { params: { groupId: string } }) {
  const { groupId } = params;
  redirect(`${groupId}/general`);
}

export default page;
