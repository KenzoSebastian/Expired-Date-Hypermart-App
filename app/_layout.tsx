import { PushNotificationManager } from "@/components/PushNotificationManager";
import { SafeScreen } from "@/components/SafeScreen";
import UserContextProvider from "@/context/UserContext";
import { queryClient } from "@/lib/query-client";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import Constants from "expo-constants";

export default function RootLayout() {
  const clerkPubishableKey = Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY;

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPubishableKey}>
        <UserContextProvider>
          <SafeScreen>
            <PushNotificationManager>
              <Slot />
            </PushNotificationManager>
          </SafeScreen>
        </UserContextProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
