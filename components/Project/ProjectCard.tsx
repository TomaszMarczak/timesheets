import { Container } from "../View";
import { Colors, Text, useTheme } from "@rneui/themed";
import { Pressable, StyleSheet } from "react-native";
import { Project } from "../../models/Project";
import { Card } from "../Card";
import { useProjectsContext } from "../../context/ProjectsContext";
import { formatDate } from "../../helpers/utils";
import Loadable from "react-loadable";
import { useState } from "react";
import { ProjectInfoModalProps } from "../Project/ProjectInfoModal";

const ProjectInfoModal = Loadable({
  loader: () => import("../Project/ProjectInfoModal"),
  loading: () => null,
  render(loaded, props: ProjectInfoModalProps) {
    const Component = loaded.ProjectInfoModal;
    return <Component project={props.project} closeModal={props.closeModal} />;
  },
});

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);
  const { deleteProject } = useProjectsContext();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable onLongPress={() => setModalVisible(true)}>
        <Card>
          <Container style={styles.cardBody}>
            <Text style={styles.cardTitle}>{project.name}</Text>
            <Text style={styles.cardDate}>{formatDate(project.date)}</Text>
          </Container>
          <Container>
            <Text style={styles.cardOwner}>{project.owner.name}</Text>
          </Container>
        </Card>
        {modalVisible && (
          <ProjectInfoModal
            project={project}
            closeModal={() => setModalVisible(false)}
          />
        )}
      </Pressable>
    </>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardTitle: {
      fontWeight: "bold",
      color: colors.text,
      flexWrap: "wrap",
      width: "50%",
    },
    cardOwner: {
      fontSize: 12,
      color: colors.text,
    },
    cardDate: {
      color: colors.text,
    },
  });
