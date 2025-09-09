import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const TestScreen = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Test Screen</Text>
      <TouchableOpacity
        onPress={() => {
          router.replace("/");
        }}
      >
        <Text>pergi ke main</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestScreen;
