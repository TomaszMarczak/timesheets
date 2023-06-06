import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import theme from "../styles/theme";
import { ReactNode } from "react";
import { View } from "react-native";

interface CardProps {
  children: ReactNode;
}

export const Card = (props: CardProps) => {
  return <View style={styles.card}>{props.children}</View>;
};

//Create stylesheets for the Card component
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    opacity: 0.8,
    borderColor: theme.colors.border,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flexGrow: 1,
  },
});
