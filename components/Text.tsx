import theme from "../styles/theme";
import { Text, TextProps } from "@rneui/themed";

export const Title = (props: TextProps) => {
  return (
    <Text h1 style={{ color: theme.colors.textPrimary }}>
      {props.children}
    </Text>
  );
};
