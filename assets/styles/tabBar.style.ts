import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const tabBarStyle = StyleSheet.create({
  icon: { height: 29, width: 29, marginBottom: 15 },
  tabBar: {
    backgroundColor: COLORS.backgroundUtils,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: 20,
    height: 105,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
});
