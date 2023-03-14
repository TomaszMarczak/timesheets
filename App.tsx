import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { appInitialization } from "./helpers/appInitialization";
import { store } from "./redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ChangeName from "./screens/ChangeName";
import HomeScreen from "./screens/HomeScreen";
import CreateProject from "./screens/CreateProject";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    appInitialization().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }}>
              {(props) => <HomeScreen {...props} isLoading={isLoading} />}
            </Stack.Screen>
            <Stack.Screen
              name="ChangeName"
              component={ChangeName}
              options={{ headerShown: true, title: "Change name" }}
            />
            <Stack.Screen
              name="CreateProject"
              component={CreateProject}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
