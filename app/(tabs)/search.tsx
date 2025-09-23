import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";
import React from "react";
import { Text, View } from "react-native";

const Search = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />
      {/* content */}
      <Text>Search Screen</Text>
    </View>
  );
};

export default Search;
