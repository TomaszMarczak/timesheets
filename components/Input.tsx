import styled from "styled-components/native";
import { Input as rneuiInput } from "@rneui/themed";

import theme from "../styles/theme";

export const Input = styled(rneuiInput)`
  margin-top: 10px;
  color: ${theme.colors.text};
`;
