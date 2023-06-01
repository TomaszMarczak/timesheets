import styled from "styled-components/native";
import { Pressable } from "react-native";
import theme from "../styles/theme";
import React from "react";

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  primary?: boolean;
  secondary?: boolean;
  active?: boolean;
}

export const Button = styled(Pressable)<ButtonProps>`
  color: ${theme.colors.text};
  padding: 12px;
  margin: 10px;
  font-weight: 600;
  font-size: 16px;
  margin: 10px 0 5px 0;
  border-radius: 5px;
  border: 2px solid ${theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  }
`;
