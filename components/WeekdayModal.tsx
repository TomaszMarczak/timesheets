import { Overlay, useTheme } from "@rneui/themed";
import { Card } from "../components/Card";
import { weekdays } from "./WeekdaySelectableButton";
import { Subtitle, Title } from "./Text";
import { NumericInput } from "./Input";
import { Button } from "./Button";
import { Row } from "./View";

interface WeekdayModalProps {
  weekday: number | null; //change to weekday
  workingHours: number[];
  setWorkingHours: (workingHours: number[]) => void;
  closeModal: () => void;
}

export const WeekdayModal = (props: WeekdayModalProps) => {
  const { weekday, workingHours, setWorkingHours, closeModal } = props;
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  const handleChangeWeekdayWorkingHours = (value: string) => {
    //Enter only numbers, cannot be less than 0 and more than 24.
    if (parseInt(value) < 0 || parseInt(value) > 24) return;
    if (value.startsWith("0") && /\D/.test(value)) return;
    if (value === "" || value === "0" || value === "00") {
      const newWorkingHours = [...workingHours];
      newWorkingHours[weekday as number] = 0;
      setWorkingHours(newWorkingHours);
      return;
    }
    //If the value is not empty, set it to the working hours array.
    if (!isNaN(parseInt(value))) {
      const newWorkingHours = [...workingHours];
      newWorkingHours[weekday as number] = parseInt(value);
      setWorkingHours(newWorkingHours);
    }
  };

  return (
    <Overlay
      isVisible={true}
      onBackdropPress={closeModal}
      overlayStyle={{ ...styles.overlay }}
    >
      <Title style={styles.title}>{weekdays[props.weekday as number]}</Title>
      <Card>
        <Subtitle>Working hours</Subtitle>
        <NumericInput
          value={props.workingHours[weekday as number].toString()}
          onChangeText={handleChangeWeekdayWorkingHours}
          selectTextOnFocus
        />
      </Card>
    </Overlay>
  );
};

const makeStyles = (colors: any) => ({
  overlay: {
    backgroundColor: colors.card,
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    color: colors.active,
    margin: "auto",
  },
});
