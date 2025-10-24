import { globalStyles } from "@/assets/styles/global.styles";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  const [textLoading, setTextLoading] = useState("Loading");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextLoading((prev) => (prev.length >= 10 ? "Loading" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [textLoading]);

  if (isSignedIn === undefined) {
    return (
      <View style={{ ...globalStyles.container, alignItems: "center", gap: 70 }}>
        <Image source={require("@/assets/images/logo2.png")} style={{ width: 320, objectFit: "contain" }} />
        <Text style={{ ...globalStyles.headingSection, fontSize: 30 }}>{textLoading}</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName={isSignedIn ? "(tabs)" : "(auth)"}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="category/[params]" />
      <Stack.Screen name="detail/[id]" />
    </Stack>
  );
}
