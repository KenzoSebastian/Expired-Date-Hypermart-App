import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 35,
    marginBottom: 20,
  },
  userNameText: {
    color: COLORS.subText,
    fontWeight: "600",
    fontSize: 17,
    marginTop: 5,
  },
  profileBox: {
    width: "100%",
    padding: 15,
    marginTop: 35,
    marginBottom: 20,
    backgroundColor: COLORS.backgroundUtils,
    borderRadius: 7,
    boxShadow: "2px 4px 9px 0px rgba(0, 0, 0, 0.25)",
    gap: 10,
  },
  dividerLine: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  logout: {
    width: "100%",
    padding: 10,
    backgroundColor: COLORS.error,
    borderRadius: 7,
    boxShadow: "2px 4px 9px 0px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
  },
});
