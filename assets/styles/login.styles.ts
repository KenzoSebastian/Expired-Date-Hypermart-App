import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
  },
  headerImage: {
    width: "100%",
    objectFit: "contain",
    height: 150,
    marginVertical: 50,
  },
  headerText: {
    color: "white",
    fontSize: 31,
    fontWeight: "bold",
  },
  box: {
    width: "100%",
    height: 430,
    marginTop: 30,
    borderRadius: 30,
    overflow: "hidden",
  },
  overlayBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
  },
  headerBoxText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
    fontWeight: "bold",
    width: "80%",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  footer: {
    alignItems: "flex-end",
    width: "100%",
    marginTop: 20,
  },
  buttonSignIn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonSignInText: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
