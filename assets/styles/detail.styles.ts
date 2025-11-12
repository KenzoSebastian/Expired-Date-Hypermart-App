import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const detailStyles = StyleSheet.create({
  wrapperImage: {
    justifyContent: "center",
    paddingVertical: 40,
    marginBottom: 40,
  },
  imageProduct: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  badgeExpired: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  infoDetails: {
    fontWeight: "600",
    fontSize: 18,
  },
  buttonRecordSales: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    boxShadow: "2px 4px 9px 0px rgba(0, 0, 0, 0.25)",
  },
  overlayModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 320,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  maxButtonModal: {
    marginLeft: 10,
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonFooterModal: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  textButtonModal: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
