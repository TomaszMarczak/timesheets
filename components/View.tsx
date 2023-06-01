import styled from "styled-components/native";
import { SafeAreaView as RNSAV } from "react-native-safe-area-context";
import { View as styledView } from "react-native";
import theme from "../styles/theme";

export const SafeAreaView = styled(RNSAV)`
  margin: 0 auto;
  color: ${theme.colors.text};
  background: ${theme.colors.background};
`;

export const View = styled(styledView)``;
