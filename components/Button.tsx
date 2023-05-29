import styled from "styled-components";
import theme from "../styles/theme";

interface Button extends React.HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
}

export const Button = styled.button<Button>`
  color: ${theme.colors.text};
  padding: 10px;
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
