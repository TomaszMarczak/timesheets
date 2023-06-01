import styled from "styled-components/native";
import { Input as rneuiInput } from "@rneui/themed";

import theme from "../styles/theme";

export const Input = styled(rneuiInput)`
  color: ${theme.colors.text};
  background: ${theme.colors.card};
`;
