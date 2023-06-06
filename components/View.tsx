import styled from "styled-components/native";
import { SafeAreaView as RNSAV } from "react-native-safe-area-context";
import { ScrollView as RNScrollView } from "react-native";
import { View as styledView } from "react-native";
import theme from "../styles/theme";

export const SafeAreaView = styled(RNSAV)`
  margin: 0 auto;
  background: ${theme.colors.background};
`;

export const ScrollView = styled(RNScrollView)``;

export const View = styled(styledView)``;

export const Row = styled.View`
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
`;
