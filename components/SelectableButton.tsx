import styled from "styled-components/native";
import theme from "../styles/theme";
import { StyledButton } from "./Button";
import { TouchableOpacity } from "react-native";
import { ReactNode, useState } from "react";

export const SelectableButton = styled(StyledButton)`
  color: ${theme.colors.text};
  padding: 10px;
  font-weight: 600;
  font-size: 16px;
  margin: 10px 0 5px 0;
  border-radius: 5px;
  border: 2px solid ${theme.colors.border};
  cursor: pointer;

  ${(props) =>
    props.active &&
    `
    background: ${theme.colors.primary};
    color: #fff
    `}
`;

export const WeekdaySelectableButton = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <SelectableButton active={active}>{children}</SelectableButton>
    </TouchableOpacity>
  );
};
