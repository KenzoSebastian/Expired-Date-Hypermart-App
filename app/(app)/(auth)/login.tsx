import { globalStyles } from "@/assets/styles/global.styles";
import { loginStyles } from "@/assets/styles/login.styles";
import { COLORS } from "@/constants/Colors";
import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
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

const LoginScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [Error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordSecure, setPasswordSecure] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    if (!isLoaded) {
      setError("Authentication service is not ready. Please try again later.");
      return;
    }

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
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
    <View style={loginStyles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
          <Image source={require("@/assets/images/logo2.png")} style={loginStyles.headerImage} />
          <Text style={loginStyles.headerText}>Expired Date Check App</Text>
          <ImageBackground source={require("@/assets/images/bg-login-form.png")} style={loginStyles.box}>
            <View style={loginStyles.overlayBox}>
              <Text style={loginStyles.headerBoxText}>Sign In</Text>
              {Error !== "" && <Text style={loginStyles.errorText}>{Error}</Text>}
              <Text
                style={{
                  marginTop: Error !== "" ? 15 : 40,
                  ...loginStyles.label,
                }}
              >
                Username
              </Text>
              <TextInput
                style={{
                  borderWidth: Error !== "" ? 2 : 1,
                  borderColor: Error !== "" ? COLORS.error : COLORS.text,
                  ...globalStyles.textField,
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
                  marginTop: 20,
                  ...loginStyles.label,
                }}
              >
                Password
              </Text>
              <View
                style={{
                  borderWidth: Error !== "" ? 2 : 1,
                  borderColor: Error !== "" ? COLORS.error : COLORS.text,
                  ...globalStyles.wrapperInput,
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
              <View style={loginStyles.footer}>
                <TouchableOpacity
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  disabled={loading}
                  style={{
                    opacity: loading ? 0.7 : 1,
                    ...loginStyles.buttonSignIn,
                  }}
                >
                  <Text style={loginStyles.buttonSignInText}>{loading ? "Signing in..." : "Sign In"}</Text>
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
