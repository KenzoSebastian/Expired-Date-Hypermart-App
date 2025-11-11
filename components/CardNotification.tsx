import { cardStyles } from "@/assets/styles/global.styles";
import { COLORS } from "@/constants/Colors";
import { type notificationType } from "@/lib/api";
import { formatFuzzyTime } from "@/utils/formatFuzzyTime";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const CardNotification = ({
  title,
  message,
  createdAt,
  seen,
  fnOnPress,
}: notificationType & { fnOnPress: () => void }) => {
  return (
    <View style={cardStyles.overlay}>
      <TouchableOpacity
        style={{
          ...cardStyles.container,
          paddingLeft: 5,
          gap: 3,
          backgroundColor: seen ? COLORS.card : COLORS.backgroundExpiringLater,
        }}
        activeOpacity={0.8}
        onPress={fnOnPress}
      >
        <Ionicons
          name="information-circle"
          size={80}
          color={seen ? COLORS.secondary : COLORS.backgroundUtils}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{ ...cardStyles.heading, color: seen ? COLORS.secondary : COLORS.backgroundUtils }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text
            style={{
              ...cardStyles.subHeading,
              fontWeight: "500",
              color: seen ? COLORS.text : COLORS.backgroundUtils,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {message}
          </Text>
          <Text
            style={{
              ...cardStyles.subHeading,
              alignSelf: "flex-end",
              marginTop: 15,
              color: seen ? COLORS.subText : COLORS.backgroundUtils,
            }}
          >
            {formatFuzzyTime(createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
