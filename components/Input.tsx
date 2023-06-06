import styled from "styled-components/native";
import { TextInput as RNInput } from "react-native";
import theme from "../styles/theme";

export const Input = styled(RNInput)`
  color: ${theme.colors.text};
  margin: 10px 0 0 0;
  padding: 18px;
  font-weight: 600;
  font-size: 16px;
`;
