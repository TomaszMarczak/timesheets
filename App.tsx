import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ChangeName from "./screens/ChangeName";
import HomeScreen from "./screens/HomeScreen";
import CreateProject from "./screens/CreateProject";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen
              name="ChangeName"
              component={ChangeName}
              options={{ headerShown: false, title: "Change name" }}
            />
            <Stack.Screen
              name="CreateProject"
              component={CreateProject}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}
