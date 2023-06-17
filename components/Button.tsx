import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors, useTheme } from "@rneui/themed";
import { Text } from "@rneui/themed";
import { RootStackParamList } from "../models/Routing";

export interface ButtonProps extends PressableProps {
  title?: string;
  primary?: boolean;
  secondary?: boolean;
  active?: boolean;
  danger?: boolean;
  cStyles?: StyleProp<ViewStyle>;
}

interface LinkButtonProps extends ButtonProps {
  to: string;
}

export const Button = (props: ButtonProps) => {
  const { theme } = useTheme();
  const staticStyles = makeStyles(theme.colors);
  const dynamicStyles = {
    ...staticStyles.button,
    ...(props.primary && staticStyles.primary),
    ...(props.secondary && staticStyles.secondary),
    ...(props.active && staticStyles.active),
    ...(props.danger && staticStyles.danger),
  } as StyleProp<ViewStyle>;

  const buttonStyle = [dynamicStyles, props.cStyles];

  return (
    <Pressable style={buttonStyle} {...props}>
      <Text style={{ fontWeight: "600", textAlign: "center" }}>
        {props.title}
      </Text>
      {props.children as React.ReactNode}
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

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 5,
      padding: 12,
      marginVertical: 5,
      minWidth: 150,
      textAlign: "center",
      cursor: "pointer",
      userSelect: "none",
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    active: {
      backgroundColor: colors.active,
    },
    danger: {
      backgroundColor: colors.warning,
    },
  });
