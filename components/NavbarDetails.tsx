import { globalStyles, navBarStyles } from "@/assets/styles/global.styles";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type NavbarDetailsProps = {
  title: string;
};

export const NavbarDetails = ({ title }: NavbarDetailsProps) => {
  const router = useRouter();
  return (
    <View style={{ ...navBarStyles.navigationHeader, height: 70 }}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={35} color={COLORS.backgroundUtils} />
      </TouchableOpacity>
      <Text style={{ ...globalStyles.headingSection, fontSize: 25, color: COLORS.backgroundUtils }}>
        {title}
      </Text>
    </View>
  );
};
