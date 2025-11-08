import { globalStyles } from "@/assets/styles/global.styles";
import { profileStyles } from "@/assets/styles/profile.style";
import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";
import { UserContext, type UserContextType } from "@/context/UserContext";
import { formatDate } from "@/utils/dateFormatter";
import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import React, { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { user } = useContext<UserContextType>(UserContext);
  const { signOut } = useAuth();

  if (!user) return null;

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
        <Image source={user.imageUrl} style={profileStyles.avatar} />
        <Text style={{ ...globalStyles.headingSection, fontSize: 24 }}>HPM - {user.storeCode}</Text>
        <Text style={profileStyles.userNameText}>@{user.username}</Text>
        <View style={profileStyles.profileBox}>
          <Text style={{ ...globalStyles.headingSection, fontSize: 22 }}>Account Information</Text>
          <View style={profileStyles.dividerLine} />
          <Text>Name: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Member Since: {formatDate(new Date(user.memberSince as string))}</Text>
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