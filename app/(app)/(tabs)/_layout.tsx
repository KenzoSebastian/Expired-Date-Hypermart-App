import { tabBarStyle } from "@/assets/styles/tabBar.style";
import { COLORS } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.secondaryInactive,
        tabBarStyle: tabBarStyle.tabBar,
        tabBarLabelStyle: tabBarStyle.label,
        animation: "shift",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <Ionicons name="fast-food-sharp" color={color} size={29} style={tabBarStyle.icon} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={29} color={color} style={tabBarStyle.icon} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={29} color={color} style={tabBarStyle.icon} />
          ),
        }}
      />
    </Tabs>
  );
}
