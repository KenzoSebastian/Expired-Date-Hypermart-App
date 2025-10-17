import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";
import { StoreCode } from "@/context/StoreCode";

const Profile = () => {
  const storeCodeContext = useContext(StoreCode);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />
      {/* content */}
      <Text>Profile Screen</Text>
      <Text>{storeCodeContext?.storeCode}</Text>
    </View>
  );
};

export default Profile;
