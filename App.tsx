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
            <Stack.Navigator
              initialRouteName="CreateProject"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: "Home" }}
              />
              <Stack.Screen name="CreateProject" component={CreateProject} />
              <Stack.Screen name="ChangeName" component={ChangeName} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
