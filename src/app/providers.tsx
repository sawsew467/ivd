import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Toaster />
      <ClerkProvider>{children}</ClerkProvider>
    </div>
  );
}

export default Providers;
