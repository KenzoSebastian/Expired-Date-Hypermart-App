import { COLORS } from "@/style/Colors";
import { ImageBackground } from "expo-image";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [Error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordSecure, setPasswordSecure] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        Alert.alert("Success", "Sign in successful!");
      } else {
        Alert.alert("Error", "Sign in failed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred during sign-in.";
      if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error &&
        Array.isArray((error as any).errors) &&
        (error as any).errors[0]?.message
      ) {
        errorMessage = (error as any).errors[0].message;
      }
      setError(errorMessage);
      console.log(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Image
            source={require("@/assets/images/logo2.png")}
            style={{
              width: "100%",
              objectFit: "contain",
              height: 150,
              marginVertical: 50,
            }}
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
              {Error !== "" && (
                <Text
                  style={{
                    fontSize: 16,
                    color: "red",
                    marginTop: 10,
                    fontWeight: "bold",
                    width: "80%",
                  }}
                >
                  {Error}
                </Text>
              )}

              <Text
                style={{
                  fontSize: 18,
                  marginTop: Error !== "" ? 15 : 40,
                  marginBottom: 10,
                  fontWeight: "500",
                }}
              >
                Username
              </Text>
              <TextInput
                style={{
                  borderWidth: Error !== "" ? 2 : 1,
                  borderColor: Error !== "" ? "red" : "#000000",
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                  fontSize: 16,
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="input username / store code..."
                focusable={true}
                autoCapitalize="none"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError("");
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 20,
                  marginBottom: 10,
                  fontWeight: "500",
                }}
              >
                Password
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: Error !== "" ? 2 : 1,
                  borderColor: Error !== "" ? "red" : "#000000",
                  borderRadius: 10,
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                  }}
                  placeholder="input password..."
                  focusable={true}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError("");
                  }}
                  secureTextEntry={passwordSecure}
                />
                <TouchableOpacity>
                  <Ionicons
                    name={passwordSecure ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#000000"
                    onPress={() => setPasswordSecure(!passwordSecure)}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: "flex-end",
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  disabled={loading}
                  style={{
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginTop: 20,
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffff",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    router.replace("/");
                  }}
                >
                  <Text>pergi ke main</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
