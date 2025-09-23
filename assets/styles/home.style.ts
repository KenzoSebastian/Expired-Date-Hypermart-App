import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    height: 1000000,
  },
  headingSection: {
    fontSize: 33,
    fontWeight: 800,
    marginBottom: 15,
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

export const InventorySectionStyles = StyleSheet.create({
  InventoryOverViewGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 15,
  },
  InventoryOverViewItem: {
    width: "47%",
    height: 130,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingBottom: 15,
    boxShadow: "7px 7px 11px -4px rgba(0, 0, 0, 0.37)",
  },
  headingWrapperInventoryItem: {
    flexDirection: "row",
  },
  headingInventoryItem: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 700,
    maxWidth: 100,
  },
  subHeadingInventoryItem: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 5,
    maxWidth: 100,
  },
  footerWrapperInventoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 13,
  },
  footerTextperiod: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
