import { COLORS } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const MainScreen = () => {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.backgroundApps,
      }}
    >
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginBottom: 20,
          padding: 15,
          backgroundColor: "red",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.replace("/login");
        }}
        style={{
          marginBottom: 20,
          padding: 15,
          backgroundColor: "blue",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>login</Text>
      </TouchableOpacity>
      <Text>Main Screen yang baru</Text>
    </View>
  );
};

export default MainScreen;
