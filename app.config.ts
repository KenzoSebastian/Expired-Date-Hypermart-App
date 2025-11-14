export default {
  expo: {
    name: "Expired Date Hypermart App",
    slug: "expired-date-hypermart-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/adaptive-icon.png",
    scheme: "expireddatehypermartapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      icon: {
        dark: "./assets/icons/ios-dark.png",
        light: "./assets/icons/ios-light.png",
        tinted: "./assets/icons/ios-tinted.png",
      },
      bundleIdentifier: "com.kenzosebastian.expireddatehypermartapp",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icons/adaptive-icon.png",
        monochromeImage: "./assets/icons/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      edgeToEdgeEnabled: false,
      package: "com.kenzosebastian.expireddatehypermartapp",
      googleServicesFile: "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/icons/splash-icon-dark.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#FFFFFF",
          dark: {
            image: "./assets/icons/splash-icon-dark.png",
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      API_URL: process.env.API_URL,
      router: {},
      eas: {
        projectId: "29644648-a303-4cdd-950d-75a9938e1a32",
      },
    },
    owner: "kenzosebastian",
  },
};
