import { StyleSheet, View } from "react-native";
import { Button, ButtonProps } from "./Button";
import { Text, useTheme } from "@rneui/themed";
import { Container } from "./View";

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
    <View style={styles.buttonContainer}>
      <Button
        active={workingHours[index] !== 0}
        onLongPress={() => openModal()}
        onPress={() => handlePress()}
        title={weekday}
        cStyles={{ marginVertical: 0 }}
      />
      {workingHours[index] !== 0 && (
        <Container style={styles.hoursContainer}>
          <Text
            style={{
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {workingHours[index]}h
          </Text>
        </Container>
      )}
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    hoursContainer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      borderColor: colors.border,
      borderLeftWidth: 2,
      height: "100%",
      width: "15%",
      right: 0,
      top: 0,
    },
    buttonContainer: {
      marginVertical: 2,
    },
  });
