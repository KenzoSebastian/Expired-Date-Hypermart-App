import { cardStyles } from "@/assets/styles/global.styles";
import { COLORS } from "@/constants/Colors";
import { type ProductType } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const CardProduct = ({ description, quantity, skuNumber, expiredDate }: ProductType) => {
  return (
    <View style={cardStyles.container}>
      <View>
        <Text style={cardStyles.headingCardProduct}>{description}</Text>
        <Text style={cardStyles.subHeadingCardProduct}>quantity: {quantity}</Text>
        <Text style={cardStyles.subHeadingCardProduct}>SKU: {skuNumber}</Text>
        <Text style={cardStyles.subHeadingCardProduct}>EXP: {expiredDate}</Text>
      </View>
      <Ionicons name="chevron-forward" size={40} color={COLORS.secondary} />
    </View>
  );
};
