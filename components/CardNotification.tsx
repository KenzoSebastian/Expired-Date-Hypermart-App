import { cardStyles } from "@/assets/styles/global.styles";
import { COLORS } from "@/constants/Colors";
import { type notificationType } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Text, TouchableOpacity, View } from "react-native";

export const CardNotification = ({
  title,
  message,
  createdAt,
  seen,
  fnOnPress,
}: notificationType & { fnOnPress: () => void }) => {
  const createdAtDate = new Date(createdAt);

  return (
    <TouchableOpacity
      style={{
        ...cardStyles.container,
        gap: 10,
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
        <Text style={{ ...cardStyles.heading, color: seen ? COLORS.secondary : COLORS.backgroundUtils }}>
          {title}
        </Text>
        <Text
          style={{
            ...cardStyles.subHeading,
            fontWeight: "500",
            color: seen ? COLORS.text : COLORS.backgroundUtils,
          }}
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
          {formatDistanceToNow(createdAtDate, { addSuffix: true })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
