import { Text, TextProps } from "@rneui/themed";

export const Title = (props: TextProps) => {
  return (
    <Text
      h1
      h1Style={{
        marginBottom: 10,
        fontSize: 48,
      }}
      {...props}
    >
      {props.children}
    </Text>
  );
};

export const Subtitle = (props: TextProps) => {
  return (
    <Text
      h2
      h2Style={{
        marginBottom: 10,
        fontSize: 24,
      }}
      {...props}
    >
      {props.children}
    </Text>
  );
};
