import { globalStyles } from "@/assets/styles/global.styles";
import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />
      <ScrollView
        contentContainerStyle={globalStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* search content */}
        <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>Explore Your Stock</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.text,
            ...globalStyles.wrapperInput,
          }}
        >
          <Ionicons name="search" size={24} color="#000000" />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
            }}
            placeholder="Search product..."
            focusable={true}
            autoCapitalize="none"
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
