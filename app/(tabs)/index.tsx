import { homeStyles } from "@/assets/styles/home.style";
import { COLORS } from "@/constants/Colors";
import { numberSplit } from "@/utils/numberSplit";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const MainScreen = () => {
  const [storeCode, setStoreCode] = useState<number>();
  const { user } = useUser();

  useEffect(() => {
    const code = numberSplit(user?.emailAddresses[0]?.emailAddress || "");
    setStoreCode(Number(code));
  }, [user]);

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.navigationHeader}>
        <Image
          source={require("@/assets/images/logo2.png")}
          style={homeStyles.navigationLogo}
          contentFit="contain"
        />
        <View>
          <Text style={homeStyles.textNav1}>HPM - {storeCode}</Text>
          <Text style={homeStyles.textNav2}>
            {user ? `@${user.username}` : "unknown"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => console.log("Notification icon pressed")}
          style={{ marginLeft: "auto" }}
        >
          <Ionicons
            name="notifications-outline"
            size={35}
            color={COLORS.backgroundUtils}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;
