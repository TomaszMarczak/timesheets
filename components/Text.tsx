import { Text, TextProps } from "@rneui/themed";

export const Title = (props: TextProps) => {
  return (
    <Text
      {...props}
      h1
      h1Style={{
        marginBottom: 18,
        fontSize: 32,
      }}
    >
      {props.children}
    </Text>
  );
};

export const Subtitle = (props: TextProps) => {
  return (
    <Text
      {...props}
      h2
      h2Style={{
        marginBottom: 10,
        fontSize: 24,
      }}
    >
      {props.children}
    </Text>
  );
};
