import { Overlay } from "@rneui/themed";
import { Card } from "../components/Card";
import { weekdays } from "./WeekdaySelectableButton";
import { Subtitle } from "./Text";
import { NumericInput } from "./Input";

interface WeekdayModalProps {
  weekday: number | null; //change to weekday
  workingHours: number[];
  setWorkingHours: (workingHours: number[]) => void;
  closeModal: () => void;
}

export const WeekdayModal = (props: WeekdayModalProps) => {
  const { weekday, workingHours, setWorkingHours, closeModal } = props;

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
    <Overlay isVisible={true} onBackdropPress={closeModal}>
      <Card>
        <Subtitle>{`Edit working hours for ${
          weekdays[props.weekday as number]
        }`}</Subtitle>
        <NumericInput
          value={props.workingHours[weekday as number].toString()}
          onChangeText={handleChangeWeekdayWorkingHours}
          selectTextOnFocus
        />
      </Card>
    </Overlay>
  );
};
