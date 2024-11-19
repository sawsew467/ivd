import { ClerkProvider } from "@clerk/nextjs";

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <ClerkProvider>{children}</ClerkProvider>
    </div>
  );
}

export default Providers;
