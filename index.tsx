import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screen/loginScreen";
import MainScreen from "./app/screen/mainScreen";

const pages = createNativeStackNavigator();

type pagesScreenType = {
  name: string;
  component: () => React.JSX.Element | undefined;
};

const pagesScreen: pagesScreenType[] = [
  {
    name: "login",
    component: LoginScreen,
  },
  {
    name: "main",
    component: MainScreen,
  },
];

export default function Index() {
  return (
    <pages.Navigator initialRouteName="login">
      {pagesScreen.map((page) => (
        <pages.Screen
          key={page.name}
          name={page.name}
          component={page.component}
          options={{ headerShown: false }}
        />
      ))}
    </pages.Navigator>
  );
}

type PageName = (typeof pagesScreen)[number]["name"];

export type RootStackParamList = {
  [K in PageName]: undefined | { data: any };
};
