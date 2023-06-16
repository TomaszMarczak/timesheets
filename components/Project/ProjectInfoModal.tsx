import { Overlay, useTheme } from "@rneui/themed";
import { Project } from "../../models/Project";
import { Card } from "../Card";
import { Subtitle, Title } from "../Text";
import { Button } from "../Button";
import { useProjectsContext } from "../../context/ProjectsContext";

export interface ProjectInfoModalProps {
  project: Project;
  closeModal: () => void;
}
export const ProjectInfoModal = (props: ProjectInfoModalProps) => {
  const { project, closeModal } = props;
  const { deleteProject } = useProjectsContext();
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);
  return (
    <Overlay isVisible onBackdropPress={closeModal} style={styles.overlay}>
      <Title style={styles.title}>{project.name}</Title>
      <Subtitle>Controls</Subtitle>
      <Button title="Delete" danger onPress={() => deleteProject(project.id)} />
    </Overlay>
  );
};

const makeStyles = (colors: any) => ({
  overlay: {
    backgroundColor: colors.card,
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    color: colors.active,
    margin: "auto",
    textAlign: "center" as "center",
  },
});
