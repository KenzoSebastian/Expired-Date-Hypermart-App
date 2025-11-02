import { navBarStyles } from "@/assets/styles/global.styles";
import { COLORS } from "@/constants/Colors";
import { UserContext, type UserContextType } from "@/context/UserContext";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Image } from "expo-image";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const NavbarComponent = () => {
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <View style={navBarStyles.navigationHeader}>
      <Image
        source={require("@/assets/images/logo2.png")}
        style={navBarStyles.navigationLogo}
        contentFit="contain"
      />
      <View>
        <Text style={navBarStyles.textNav1}>HPM - {user?.storeCode || ""}</Text>
        <Text style={navBarStyles.textNav2}>{`@${user?.username || "unknown"}`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => console.log("Notification icon pressed")}
        style={{ marginLeft: "auto" }}
      >
        <Ionicons name="notifications-outline" size={35} color={COLORS.backgroundUtils} />
      </TouchableOpacity>
    </View>
  );
};
