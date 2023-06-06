import styled from "styled-components/native";
import { SafeAreaView as RNSAV } from "react-native-safe-area-context";
import { ScrollView as RNScrollView } from "react-native";
import { View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";

export const SafeAreaView = (props: ViewProps) => {
  return <RNSAV {...props}>{props.children}</RNSAV>;
};
export const Container = (props: ViewProps) => {
  return <View>{props.children}</View>;
};

export const Row = (props: ViewProps) => {
  return <Container>{props.children}</Container>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
