import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ChangeName from "./screens/ChangeName";
import HomeScreen from "./screens/HomeScreen";
import CreateProject from "./screens/CreateProject";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./styles/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false, title: "Home" }}
              />
              <Stack.Screen
                name="CreateProject"
                component={CreateProject}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChangeName"
                component={ChangeName}
                options={{ headerShown: false, title: "Change name" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
