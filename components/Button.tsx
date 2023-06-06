import styled from "styled-components/native";
import { Pressable } from "react-native";
import theme from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  primary?: boolean;
  secondary?: boolean;
  active?: boolean;
}

interface LinkButtonProps extends ButtonProps {
  to: string;
}

export const Button = styled(Pressable)<ButtonProps>`
  color: ${theme.colors.text};
  padding: 12px;
  margin: 10px;
  min-width: 100px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid ${theme.colors.border};
  text-align: center;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    `
    background: ${theme.colors.primary};
    color: ${theme.colors.textPrimary}
  `}
  ${(props) =>
    props.secondary &&
    `
    background: ${theme.colors.secondary};
    color: ${theme.colors.textSecondary}
  `}
${(props) =>
    props.active &&
    `
    background: ${theme.colors.primary};
    color: ${theme.colors.textPrimary}
  `}
`;

export const LinkButton = ({ to, ...props }: LinkButtonProps) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate(to);
  };

  return <Button onPress={handlePress} {...props} />;
};
