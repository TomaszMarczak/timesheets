import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ChangeName from "./screens/ChangeName";
import HomeScreen from "./screens/HomeScreen";
import CreateUpdateProject from "./screens/CreateUpdateProject";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./styles/theme";
import { ProjectsProvider } from "./context/ProjectsContext";
import ProjectScreen from "./screens/ProjectScreen";
import { CameraScreen } from "./screens/CameraScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <ProjectsProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ title: "Home" }}
                />
                <Stack.Screen
                  name="ChangeName"
                  component={ChangeName}
                  options={{ title: "Change name" }}
                />
                <Stack.Screen
                  name="CreateUpdateProject"
                  component={CreateUpdateProject}
                  options={{ title: "New project" }}
                />
                <Stack.Screen
                  name="ProjectScreen"
                  component={ProjectScreen}
                  options={{ title: "Project information" }}
                />
                <Stack.Screen
                  name="CameraScreen"
                  component={CameraScreen}
                  options={{ title: "Camera" }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </ProjectsProvider>
    </UserProvider>
  );
}
