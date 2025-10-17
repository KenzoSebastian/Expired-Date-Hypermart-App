import { SafeScreen } from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import StoreCodeContextProvider from "@/context/StoreCode";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache}>
        <StoreCodeContextProvider>
          <SafeScreen>
            <Slot />
          </SafeScreen>
        </StoreCodeContextProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
