import { useState } from "react";
import { Button, ButtonProps } from "./Button";
import { Text } from "@rneui/themed";
import { Container, Row } from "./View";

interface WeekdayButtonProps extends ButtonProps {
  weekday: string;
  index: number;
  workingHours: number[];
  setVisible: (index: number) => void;
  setWorkingHours: (workingHours: number[]) => void;
  defaultWorkingHours: number | "";
}

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const WeekdaySelectableButton = (props: WeekdayButtonProps) => {
  const {
    weekday,
    workingHours,
    index,
    defaultWorkingHours,
    setWorkingHours,
    setVisible,
  } = props;

  const [active, setActive] = useState(false);

  const addDefaultWorkingHours = () => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index] = defaultWorkingHours as number;
    setWorkingHours(newWorkingHours);
  };

  const clearWorkingHours = () => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index] = 0;
    setWorkingHours(newWorkingHours);
  };

  const handlePress = () =>
    workingHours[index] === 0 ? addDefaultWorkingHours() : clearWorkingHours();

  return (
    <Button onLongPress={() => setVisible(index)} onPress={() => handlePress()}>
      <Row>
        <Text>{weekday}</Text>
        {workingHours[index] !== 0 && (
          <Container
            style={{
              position: "absolute",
              right: 0,
              width: "20%",
              height: "100%",
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "darkblue",
              }}
            >
              {workingHours[index]}h
            </Text>
          </Container>
        )}
      </Row>
    </Button>
  );
};
