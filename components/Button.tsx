import styled from "styled-components";
import theme from "../styles/theme";

export const Button = styled.button<{ primary?: boolean; secondary?: boolean }>`
  color: ${theme.colors.text};
  padding: 10px;
  font-weight: 600;
  font-size: 16px;
  margin: 5px 0;
  border-radius: 5px;
  border: 2px solid ${theme.colors.border};

  ${(props) =>
    props.primary &&
    `
    background: ${theme.colors.primary};
    color: #fff
    `}
  ${(props) =>
    props.secondary &&
    `
    background: ${theme.colors.secondary};
    color: #000
    `}
`;
