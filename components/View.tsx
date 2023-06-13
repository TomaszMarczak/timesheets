import { SafeAreaView as SAV } from "react-native-safe-area-context";
import { View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";

export const SafeAreaView = (props: ViewProps) => {
  return (
    <SAV style={styles.safeAreaView} {...props}>
      {props.children}
    </SAV>
  );
};
export const Container = (props: ViewProps) => {
  return <View {...props}>{props.children}</View>;
};

export const Row = (props: ViewProps) => {
  return <Container style={styles.row}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-evenly",
  },
  globalContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  safeAreaView: {
    marginHorizontal: "auto",
  },
});
