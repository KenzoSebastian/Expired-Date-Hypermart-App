import { errorStyles } from "@/assets/styles/global.styles";
import { Image } from "expo-image";
import { Text, View } from "react-native";
  
export const ErrorView = () => {
  return (
    <View style={errorStyles.container}>
      <Image source={require("@/assets/images/error-icon.png")} style={errorStyles.logo} />
      <Text style={errorStyles.text}>Error fetching data, please try again...</Text>
    </View>
  );
};
