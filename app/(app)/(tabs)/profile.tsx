import { globalStyles } from "@/assets/styles/global.styles";
import { profileStyles } from "@/assets/styles/profile.style";
import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";
import { StoreCode } from "@/context/StoreCode";
import { formatDate } from "@/utils/dateFormatter";
import { useAuth, useSession } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import React, { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const storeCodeContext = useContext(StoreCode);
  const { session } = useSession();
  const { signOut } = useAuth();

  if (!session) return null;

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
        <Image source={session?.user.imageUrl} style={profileStyles.avatar} />
        <Text style={{ ...globalStyles.headingSection, fontSize: 24 }}>
          HPM - {storeCodeContext?.storeCode}
        </Text>
        <Text style={profileStyles.userNameText}>@{session.user.username}</Text>
        <View style={profileStyles.profileBox}>
          <Text style={{ ...globalStyles.headingSection, fontSize: 22 }}>Account Information</Text>
          <View style={profileStyles.dividerLine} />
          <Text>Name: {session.user.username}</Text>
          <Text>Email: {session.user.emailAddresses[0].emailAddress}</Text>
          <Text>Member Since: {formatDate(session.user.createdAt)}</Text>
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
