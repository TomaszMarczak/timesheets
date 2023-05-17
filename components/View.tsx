import styled from "styled-components/native";
import theme from "../styles/theme";

export const SafeAreaView = styled.SafeAreaView`
  display: inline-block;
  margin: 0 auto;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.text};
  background: ${theme.colors.background};
`;

export const View = styled.View``;
