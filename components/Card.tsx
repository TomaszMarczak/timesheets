import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { ReactNode } from "react";
import { View } from "react-native";
import { useTheme } from "@rneui/themed";

interface CardProps {
  children: ReactNode;
}

export const Card = (props: CardProps) => {
  const theme = useTheme();
  return <View style={styles.card}>{props.children}</View>;
};

//Create stylesheets for the Card component
const styles = StyleSheet.create({
  card: {
    backgroundColor: `primary`,
    opacity: 0.8,
    borderColor: `secondary`,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flexGrow: 1,
  },
});
