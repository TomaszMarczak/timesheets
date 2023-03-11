import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { appInitialization } from "./helpers/appInitialization";
import { store } from "./redux/store";

export default function App() {
  useEffect(() => {
    appInitialization();
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Hello world</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
