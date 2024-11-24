"use client";

import { store } from "@/store";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Provider store={store}>
        <Toaster />
        <ClerkProvider>{children}</ClerkProvider>
      </Provider>
    </div>
  );
}

export default Providers;
