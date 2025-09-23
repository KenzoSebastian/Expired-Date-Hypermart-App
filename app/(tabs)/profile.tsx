import { View, Text } from "react-native";
import React from "react";
import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";

const Profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />
      {/* content */}
      <Text>Profile Screen</Text>
    </View>
  );
};

export default Profile;
