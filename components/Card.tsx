import { StyleSheet } from "react-native";
import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "@rneui/themed";
import { withTheme } from "@rneui/themed";

interface CardProps extends ViewProps {
  children: ReactNode;
}

export const Card = (props: CardProps) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  return <View style={styles.card}>{props.children}</View>;
};
const makeStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      opacity: 0.8,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      margin: 10,
    },
  });
