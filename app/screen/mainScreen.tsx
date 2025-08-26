import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "..";

const MainScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Main Screen</Text>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>pergi ke login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;
