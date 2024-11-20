import { redirect } from "next/navigation";

function page({ params }: { params: { menteeId: string } }) {
  const { menteeId } = params;
  redirect(`${menteeId}/roadmap`);
}

export default page;
