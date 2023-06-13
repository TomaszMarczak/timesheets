import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

export interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  primary?: boolean;
  secondary?: boolean;
  active?: boolean;
}

interface LinkButtonProps extends ButtonProps {
  to: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <Pressable style={styles.button} {...props}>
      {props.children}
    </Pressable>
  );
};

export const LinkButton = ({ to, ...props }: LinkButtonProps) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate(to);
  };

  return <Button onPress={handlePress} {...props} />;
};

const styles = StyleSheet.create({
  button: {
    color: "primary",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 12,
    marginVertical: 5,
    minWidth: 150,
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});
