import styled from "styled-components/native";
import theme from "../styles/theme";
import { View } from "react-native";

export const Card = styled(View)`
  background: ${theme.colors.card};
  opacity: 0.8;
  border: 2px solid ${theme.colors.border};
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  flex-grow: 1;
`;
