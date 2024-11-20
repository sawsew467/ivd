import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function RoadmapStarter() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center mt-20">
      <h3 className="text-2xl font-medium text-center">
        This mentee haven&apos;t have roadmap yet, create one?
      </h3>
      <p className="text-slate-600 ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        scelerisque, nunc eget lacinia fermentum, lig
      </p>
      <div className="flex gap-4 mt-4 w-2/5">
        <Button
          className="flex-1"
          variant="outline"
          onClick={() => router.push("?createBy=manual")}
        >
          Create by Manual
        </Button>
        <Button className="flex-1" onClick={() => router.push("?createBy=ai")}>
          Generative AI
        </Button>
      </div>
    </div>
  );
}

export default RoadmapStarter;
