import { DateData } from "react-native-calendars";
import { Card } from "./Card";
import { NumericInput, TextInput } from "./Input";
import { ModalProps, ModalWrapper } from "./ModalWrapper";
import { Subtitle } from "./Text";
import { Button } from "./Button";
import { Row } from "./View";
import { useState } from "react";
import { valueBetween0And24 } from "../helpers/utils";
import { useUserContext } from "../context/UserContext";
import { Contractor } from "../models/Contractor";
import { useCalendar } from "../helpers/useCalendar";
import { Project } from "../models/Project";

export interface WorkdayModalProps extends ModalProps {
  project: Project;
  chosenDate: DateData | null;
}

export const WorkdayModal = (props: WorkdayModalProps) => {
  const { closeModal, isVisible, chosenDate, project } = props;
  const [hours, setHours] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { addWorkday } = useCalendar();

  const handleChangeHours = (value: string) => {
    if (!valueBetween0And24(value)) return;
    if (value === "" || value === "0" || value === "00") {
      setHours(0);
      return;
    }
    setHours(parseInt(value));
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
    addWorkday(project.id, workday);
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
        <NumericInput onChangeText={handleChangeHours} />
      </Card>
      <Card>
        <Subtitle>Comment</Subtitle>
        <TextInput
          onChangeText={handleChangeComment}
          multiline
          style={{ height: 100 }}
          placeholder="Enter comment if needed..."
        />
      </Card>
      <Row>
        <Button onPress={closeModal} title="Cancel" />
        <Button onPress={handleSave} title="Save" />
      </Row>
    </ModalWrapper>
  );
};
