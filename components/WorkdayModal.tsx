import { DateData } from "react-native-calendars";
import { Card } from "./Card";
import { NumericInput, TextInput } from "./Input";
import { ModalProps, ModalWrapper } from "./ModalWrapper";
import { Subtitle } from "./Text";
import { Button } from "./Button";
import { Row } from "./View";

export interface WorkdayModalProps extends ModalProps {
  chosenDate: DateData | null;
}

export const WorkdayModal = (props: WorkdayModalProps) => {
  const { closeModal, isVisible, chosenDate } = props;

  const handleSave = () => {
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
        <NumericInput />
      </Card>
      <Card>
        <Subtitle>Comment</Subtitle>
        <TextInput
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
