import { Colors, Overlay, useTheme } from "@rneui/themed";
import { Project } from "../../models/Project";
import { Card } from "../Card";
import { Subtitle, Title } from "../Text";
import { Button } from "../Button";
import { useProjectsContext } from "../../context/ProjectsContext";
import { useNavigation } from "@react-navigation/native";
import { ModalProps, ModalWrapper } from "../ModalWrapper";

export interface ProjectInfoModalProps extends ModalProps {
  project: Project;
}
export const ProjectInfoModal = (props: ProjectInfoModalProps) => {
  const { project, closeModal, isVisible } = props;
  const { deleteProject } = useProjectsContext();
  const navigation = useNavigation<any>();

  const handleEdit = () => {
    navigation.navigate("CreateUpdateProject", { project: project });
    closeModal();
  };
  return (
    <ModalWrapper
      title={project.name}
      closeModal={closeModal}
      isVisible={isVisible}
    >
      <Card>
        <Subtitle>Controls</Subtitle>
        <Button title="Edit" onPress={handleEdit} />
        <Button
          title="Delete"
          danger
          onPress={() => deleteProject(project.id)}
        />
      </Card>
    </ModalWrapper>
  );
};
