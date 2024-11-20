import { redirect } from "next/navigation";

type tParams = Promise<{ groupId: string }>;

async function page({ params }: { params: tParams }) {
  const { groupId } = await params;
  redirect(`${groupId}/general`);
}

export default page;
