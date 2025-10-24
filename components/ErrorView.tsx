import { errorStyles } from "@/assets/styles/global.styles";
import { Image } from "expo-image";
import { Text, View } from "react-native";
  
export const ErrorView = ({message} : {message: string}) => {
  return (
    <View style={errorStyles.container}>
      <Image source={require("@/assets/images/error-icon.png")} style={errorStyles.logo} />
      <Text style={errorStyles.text}>{message}</Text>
    </View>
  );
};
