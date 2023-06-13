import { StyleSheet } from "react-native";
import { ReactNode } from "react";
import { View } from "react-native";

interface CardProps {
  children: ReactNode;
}

export const Card = (props: CardProps) => {
  return <View style={styles.card}>{props.children}</View>;
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: `primary`,
    opacity: 0.8,
    borderColor: `secondary`,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
