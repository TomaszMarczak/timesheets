import styled from "styled-components/native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
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
    padding: 12,
    margin: 10,
    minWidth: 100,
    fontWeight: "600",
    fontSize: 16,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});
