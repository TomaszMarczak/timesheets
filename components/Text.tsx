import styled from "styled-components/native";
import { Text as RNText } from "react-native";
import theme from "../styles/theme";

export const Text = styled.Text`
  color: ${theme.colors.text};
  font-size: 16px;
  margin: 2px;
`;

export const Title = styled(Text)`
  font-size: 36px;
  font-weight: 600;
`;
