import { SafeScreen } from "@/components/SafeScreen";
import StoreCodeContextProvider from "@/context/StoreCode";
import { queryClient } from "@/lib/query-client";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

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
