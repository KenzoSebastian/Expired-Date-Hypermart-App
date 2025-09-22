import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundApps,
  },
  navigationHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    width: "100%",
    gap: 10,
  },
  navigationLogo: {
    width: 140,
    height: 80,
  },
  textNav1: {
    color: COLORS.backgroundUtils,
    fontSize: 20,
    fontWeight: 900,
  },
  textNav2: {
    color: COLORS.backgroundUtils,
    fontSize: 14,
  },
});
