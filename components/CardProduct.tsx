import { productListSectionStyles } from "@/assets/styles/home.style";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

type CardProductProps = {
  description: string;
  quantity: number;
  skuNumber: number;
  expiredDate: string;
};

const CardProduct = ({ description, quantity, skuNumber, expiredDate }: CardProductProps) => {
  return (
    <View style={productListSectionStyles.cardProduct}>
      <View>
        <Text style={productListSectionStyles.headingCardProduct}>{description}</Text>
        <Text style={productListSectionStyles.subHeadingCardProduct}>quantity: {quantity}</Text>
        <Text style={productListSectionStyles.subHeadingCardProduct}>SKU: {skuNumber}</Text>
        <Text style={productListSectionStyles.subHeadingCardProduct}>EXP: {expiredDate}</Text>
      </View>
      <Ionicons name="chevron-forward" size={40} color={COLORS.secondary} />
    </View>
  );
};

export default CardProduct;
