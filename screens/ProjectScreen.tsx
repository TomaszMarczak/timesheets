import { Layout } from "../components/Layouts/Layout";
import { Colors, Text, useTheme } from "@rneui/themed";
import { RootStackParamList } from "../models/Routing";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Subtitle, Title } from "../components/Text";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useProjectsContext } from "../context/ProjectsContext";
import { Row } from "../components/View";
import { formatDate } from "../helpers/utils";
import { useState } from "react";
import { QRCodeModal } from "../components/QRCodeModal";

const ProjectScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ProjectScreen">>();
  const project = route.params?.project;
  const { deleteProject } = useProjectsContext();
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleEdit = () => {
    navigation.navigate("CreateUpdateProject", { project: project });
  };
  const [projectShareModal, setProjectShareModal] = useState(false);

  const shareableProject = JSON.stringify({
    id: project.id,
    name: project.name,
    owner: project.owner,
    workingHours: project.workingHours,
    date: project.date,
  });

  const handleDelete = () => {
    deleteProject(project.id);
    navigation.navigate("HomeScreen");
  };

  const handleShare = () => {
    setProjectShareModal(true);
  };
  return (
    <Layout>
      <Title style={{ textAlign: "center" }}>{project.name}</Title>
      <Row>
        <Text>{project.owner.name}</Text>
        <Text>{formatDate(project.date)}</Text>
      </Row>
      <Card>
        <Subtitle>Calendar</Subtitle>
      </Card>
      <Card>
        <Subtitle>Controls</Subtitle>
        <Button title="Share project" onPress={handleShare} />
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Delete" danger onPress={handleDelete} />
      </Card>
      <QRCodeModal
        value={shareableProject}
        isVisible={projectShareModal}
        handleClose={() => setProjectShareModal(false)}
      />
    </Layout>
  );
};

const makeStyles = (colors: Colors) => {};

export default ProjectScreen;
