import { redirect } from "next/navigation";

type tParams = Promise<{ menteeId: string }>;

async function Page({ params }: { params: tParams }) {
  const { menteeId } = await params;
  redirect(`${menteeId}/roadmap`);
}

export default Page;
