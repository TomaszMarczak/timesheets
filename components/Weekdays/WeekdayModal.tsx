import { Colors, Overlay, useTheme } from "@rneui/themed";
import { Card } from "../Card";
import { weekdays } from "./WeekdaySelectableButton";
import { Subtitle, Title } from "../Text";
import { NumericInput } from "../Input";
import { Button } from "../Button";
import { Row } from "../View";
import { ModalProps, ModalWrapper } from "../ModalWrapper";
import { valueBetween0And24 } from "../../helpers/utils";

interface WeekdayModalProps extends ModalProps {
  weekday: number | null; //change to weekday
  workingHours: number[];
  setWorkingHours: (workingHours: number[]) => void;
}

export const WeekdayModal = (props: WeekdayModalProps) => {
  const { weekday, workingHours, setWorkingHours, closeModal, isVisible } =
    props;
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  const handleChangeWeekdayWorkingHours = (value: string) => {
    if (!valueBetween0And24(value)) return;
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
    <ModalWrapper
      title={weekdays[props.weekday as number]}
      closeModal={closeModal}
      isVisible={isVisible}
    >
      <Card>
        <Subtitle>Working hours</Subtitle>
        <NumericInput
          value={props.workingHours[weekday as number].toString()}
          onChangeText={handleChangeWeekdayWorkingHours}
          selectTextOnFocus
        />
      </Card>
    </ModalWrapper>
  );
};

const makeStyles = (colors: Colors) => ({
  overlay: {
    backgroundColor: colors.card,
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    color: colors.active,
    margin: "auto",
    textAlign: "center" as "center",
  },
});
