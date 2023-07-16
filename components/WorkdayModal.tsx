import { DateData } from "react-native-calendars";
import { Card } from "./Card";
import { NumericInput, TextInput } from "./Input";
import { ModalProps, ModalWrapper } from "./ModalWrapper";
import { Subtitle } from "./Text";
import { Button } from "./Button";
import { Row } from "./View";
import { useState } from "react";
import { valueBetween0And24 } from "../helpers/utils";
import { useCalendar } from "../helpers/useCalendar";
import { useEffect } from "react";

export interface WorkdayModalProps extends ModalProps {
  projectId: string;
  chosenDate: DateData | null;
}

export const WorkdayModal = (props: WorkdayModalProps) => {
  const { closeModal, isVisible, chosenDate, projectId } = props;
  const [hours, setHours] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { addWorkday, getWorkday } = useCalendar();

  useEffect(() => {
    if (chosenDate === null) return;
    const workday = getWorkday(projectId, chosenDate.dateString);
    if (workday !== undefined) {
      setHours(workday.hours);
      setComment(workday.comment);
    } else {
      setHours(0);
      setComment("");
    }
  }, [chosenDate]);

  const handleChangeHours = (value: string) => {
    if (!valueBetween0And24(value)) return;
    if (value === "" || value === "0" || value === "00") {
      setHours(0);
      return;
    }
    //If the value is not empty, set it to the working hours array.
    if (!isNaN(parseInt(value))) {
      setHours(parseInt(value));
    }
  };

  const handleChangeComment = (value: string) => {
    setComment(value);
  };

  const handleSave = () => {
    if (chosenDate === null) return;
    const workday = {
      date: chosenDate.dateString,
      hours: hours,
      comment: comment,
    };
    addWorkday(projectId, workday);
    closeModal();
  };
  return (
    <ModalWrapper
      isVisible={isVisible}
      closeModal={closeModal}
      title={chosenDate?.dateString}
    >
      <Card>
        <Subtitle>Edit workday hours</Subtitle>
        <NumericInput
          value={hours.toString()}
          onChangeText={handleChangeHours}
        />
      </Card>
      <Card>
        <Subtitle>Comment</Subtitle>
        <TextInput
          onChangeText={handleChangeComment}
          multiline
          value={comment}
          placeholder="Enter comment if needed..."
        />
      </Card>
      <Row>
        <Button onPress={handleSave} title="Save" />
      </Row>
    </ModalWrapper>
  );
};
