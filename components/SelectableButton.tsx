import { TouchableOpacity } from "react-native";
import { ReactNode, useState } from "react";
import { Button } from "./Button";

export const SelectableButton = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return <Button></Button>;
};
