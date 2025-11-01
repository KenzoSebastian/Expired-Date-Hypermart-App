import { globalStyles } from "@/assets/styles/global.styles";
import { profileStyles } from "@/assets/styles/profile.style";
import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import { formatDate } from "@/utils/dateFormatter";
import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import React, { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const globalUser = useContext(UserContext);
  const { signOut } = useAuth();

  if (!globalUser) return null;

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* navigation bar */}
      <NavbarComponent />
      <ScrollView
        contentContainerStyle={{ ...globalStyles.scrollViewContainer, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* profile content */}
        <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>Profile</Text>
        <Image source={globalUser.user?.imageUrl} style={profileStyles.avatar} />
        <Text style={{ ...globalStyles.headingSection, fontSize: 24 }}>
          HPM - {globalUser.user?.storeCode}
        </Text>
        <Text style={profileStyles.userNameText}>@{globalUser.user?.username}</Text>
        <View style={profileStyles.profileBox}>
          <Text style={{ ...globalStyles.headingSection, fontSize: 22 }}>Account Information</Text>
          <View style={profileStyles.dividerLine} />
          <Text>Name: {globalUser.user?.username}</Text>
          <Text>Email: {globalUser.user?.email}</Text>
          <Text>Member Since: {formatDate(new Date(globalUser.user?.memberSince as string))}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={profileStyles.logout} onPress={handleLogout}>
          <Text style={{ ...globalStyles.headingSection, fontSize: 22, color: COLORS.backgroundUtils }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
