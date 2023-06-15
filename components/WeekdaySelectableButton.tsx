import { StyleSheet } from "react-native";
import { useState } from "react";
import { Button, ButtonProps } from "./Button";
import { Text, useTheme } from "@rneui/themed";
import { Container, Row } from "./View";

interface WeekdayButtonProps extends ButtonProps {
  weekday: string;
  index: number;
  workingHours: number[];
  openModal: () => void;
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
    openModal,
  } = props;

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

  const handlePress = () => {
    workingHours[index] === 0 ? addDefaultWorkingHours() : clearWorkingHours();
  };

  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  return (
    <Button
      active={workingHours[index] !== 0}
      onLongPress={() => openModal()}
      onPress={() => handlePress()}
      title={weekday}
    >
      {workingHours[index] !== 0 && (
        <Container style={styles.hoursContainer}>
          <Text style={{ fontWeight: "600" }}>{workingHours[index]}h</Text>
        </Container>
      )}
    </Button>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      position: "relative",
      backgroundColor: "red",
      width: "100%",
    },
    hoursContainer: {
      position: "absolute",
      justifyContent: "center",
      borderLeftWidth: 2,
      borderColor: colors.border,
      height: "100%",
      width: "15%",
      right: 0,
      top: 0,
    },
  });
