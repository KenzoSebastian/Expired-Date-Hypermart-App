import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    // height: 1000000,
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

export const InventorySectionStyles = StyleSheet.create({
  InventoryOverViewGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 15,
    marginVertical: 15,
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

export const productListSectionStyles = StyleSheet.create({
  headingContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconAscDesc: {
    width: 20,
    height: 20,
  },
  boxTriggerDropdown: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 5,
    backgroundColor: COLORS.backgroundUtils,
    width: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxDropDown: {
    borderColor: COLORS.border,
    borderRadius: 5,
    backgroundColor: COLORS.backgroundUtils,
    width: 110,
    position: "absolute",
    top: 30,
    zIndex: 1,
  },
  itemDropDown: {
    marginVertical: -2,
    marginHorizontal: -12,
  },
  productListContainer: {
    gap: 10,
    marginTop: 30,
  },
  cardProduct: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.card,
    borderRadius: 7,
    boxShadow: "2px 4px 9px 0px rgba(0, 0, 0, 0.25)",
  },
  headingCardProduct: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: COLORS.secondary,
  },
  subHeadingCardProduct: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.subText,
  },
});
