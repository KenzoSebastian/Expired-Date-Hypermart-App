import { navBarStyles } from "@/assets/styles/global.styles";
import { COLORS } from "@/constants/Colors";
import { UserContext, type UserContextType } from "@/context/UserContext";
import { useGetNotification } from "@/hooks/useGetNotification";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const NavbarComponent = () => {
  const { user } = useContext<UserContextType>(UserContext);
  const router = useRouter();
  const { data } = useGetNotification({ params: { userId: user!.id } });
  const unseenNotifications = data?.data.filter((notification) => !notification.seen);
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
        onPress={() => router.push("/notification")}
        style={{ marginLeft: "auto", marginRight: 15 }}
      >
        <Ionicons name="notifications-outline" size={35} color={COLORS.backgroundUtils} />
        {unseenNotifications && unseenNotifications.length > 0 && (
          <View style={navBarStyles.notificationBadge}>
            <Text style={navBarStyles.textNotification}>{unseenNotifications?.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
