import theme from "../styles/theme";
import { Text, TextProps } from "@rneui/themed";

export const Title = (props: TextProps) => {
  return (
    <Text h1 style={{}}>
      {props.children}
    </Text>
  );
};
