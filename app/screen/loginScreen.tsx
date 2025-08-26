import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "..";

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#0093D0",
        paddingHorizontal: 20,
      }}
    >
      <Image
        source={require("@/assets/images/header.png")}
        style={{ width: "100%", objectFit: "contain", marginVertical: 50 }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 31,
          fontWeight: "bold",
        }}
      >
        Expired Date Check App
      </Text>
      <ImageBackground
        source={require("@/assets/images/bg-login-form.png")}
        style={{
          width: "100%",
          height: 430,
          marginTop: 30,
          borderRadius: 30,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            Sign In
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 40,
              marginBottom: 10,
              fontWeight: "500",
            }}
          >
            Username
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
              fontSize: 16,
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            placeholder="input username / store code..."
            focusable={true}
          />
          <Text
            style={{
              fontSize: 18,
              marginTop: 40,
              marginBottom: 10,
              fontWeight: "500",
            }}
          >
            Password
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
              fontSize: 16,
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            placeholder="input username / store code..."
          />
          <View
            style={{
              alignItems: "flex-end",
              width: "100%",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("main")}
              style={{
                backgroundColor: "#025599",
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "#ffff",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
