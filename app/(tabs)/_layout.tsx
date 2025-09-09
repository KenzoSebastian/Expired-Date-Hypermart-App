import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const TabsLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Stack screenOptions={{ headerShown: false }} />;
  return <Redirect href="/login" />;
};

export default TabsLayout;
