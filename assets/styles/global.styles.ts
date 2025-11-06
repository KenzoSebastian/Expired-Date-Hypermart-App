import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundApps,
  },
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
  ListContainer: {
    gap: 10,
    marginTop: 30,
  },
});

export const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { 
    width: 150, 
    height: 150, 
    marginBottom: 20 
  },
  text: { 
    fontSize: 20, 
    color: "red", 
    fontWeight: "bold", 
    maxWidth: 300,
  },
});

export const cardStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.card,
    borderRadius: 7,
    boxShadow: "2px 4px 9px 0px rgba(0, 0, 0, 0.25)",
  },
  heading: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    maxWidth: 270,
    color: COLORS.secondary,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.subText,
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
  notificationBadge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: COLORS.error,
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textNotification: {
    color: COLORS.backgroundUtils,
    fontSize: 12,
    fontWeight: "bold",
  }
});

export const footerStyles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    alignItems: "center",
    width: "40%",
    marginTop: 20,
  },
  pageBox: {
    width: 35,
    height: 35,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const skeletonProps = {
  background: COLORS.skeleton,
  highlight: COLORS.backgroundUtils,
};
