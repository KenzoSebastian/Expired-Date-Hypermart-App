import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  textField: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
    paddingHorizontal: 10,
    marginTop: 10,
    gap: 5,
  },
  scrollViewContainer: {
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  headingSection: {
    fontWeight: 800,
  },
});

export const navBarStyles = StyleSheet.create({
  navigationHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    width: "100%",
    gap: 10,
    boxShadow: "0px 9px 18px -4px rgba(0, 0, 0, 0.4)",
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
