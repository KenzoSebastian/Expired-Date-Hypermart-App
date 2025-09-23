import { InventorySectionStyles } from "@/assets/styles/home.style";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";

type ItemInventoryGridProps = {
  backgroundColor: string;
  icon: "close" | "hourglass-outline" | "timer-outline" | "checkmark";
  heading: string;
  qty: number;
  period: string;
  onPress: () => void;
};

export const ItemInventoryGrid = (props: ItemInventoryGridProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: props.backgroundColor,
        ...InventorySectionStyles.InventoryOverViewItem,
      }}
    >
      <View
        style={{
          paddingTop:
            props.icon === "hourglass-outline" || props.icon === "timer-outline"
              ? 10
              : 0,
          paddingLeft: props.icon === "timer-outline" ? 8 : 0,
          ...InventorySectionStyles.headingWrapperInventoryItem,
        }}
      >
        <Ionicons
          name={props.icon}
          size={props.icon === "close" ? 90 : 70}
          color="#FFFFFF"
          style={{
            marginTop: props.icon === "close" ? -7 : 0,
            marginRight:
              props.icon === "timer-outline"
                ? 5
                : props.icon === "close"
                ? -7
                : 0,
            marginLeft: props.icon === "close" ? -7 : 0,
          }}
        />
        <View>
          <Text
            style={{
              marginTop:
                props.icon === "hourglass-outline" ||
                props.icon === "timer-outline"
                  ? 0
                  : 10,
              ...InventorySectionStyles.headingInventoryItem,
            }}
          >
            {props.heading}
          </Text>
          <Text style={InventorySectionStyles.subHeadingInventoryItem}>
            {props.qty} items
          </Text>
        </View>
      </View>
      <View style={InventorySectionStyles.footerWrapperInventoryItem}>
        <Text
          style={InventorySectionStyles.footerTextperiod}
        >{`${props.period} days`}</Text>
        <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};
