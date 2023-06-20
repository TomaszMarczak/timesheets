import React, { useState } from "react";
import { Container, Row, SafeAreaView } from "../components/View";
import { Card } from "../components/Card";
import { Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { useUserContext } from "../context/UserContext";
import { useProjectsContext } from "../context/ProjectsContext";
import { Button, LinkButton } from "../components/Button";
import { Layout } from "../components/Layouts/Layout";
import { ProjectCard } from "../components/Project/ProjectCard";
import { QRCodeScanner } from "../components/QRCodeScanner";
import { Link } from "@react-navigation/native";

const HomeScreen = () => {
  const { userName, userId } = useUserContext();
  const { projects } = useProjectsContext();

  const [openQRCodeScanner, setOpenQRCodeScanner] = useState<boolean | null>(
    null
  );

  return (
    <Layout>
      <Card>
        <Title>User</Title>
        <Text>Username: {userName}</Text>
        <Text>UserId: {userId}</Text>
        <Row>
          <LinkButton to="ChangeName" title="Change name" />
        </Row>
      </Card>
      <Card>
        <Title>Projects</Title>
        <Row>
          <LinkButton to="CreateUpdateProject" title="Create new" />
          <LinkButton to="CameraScreen" title="Join existing" />
        </Row>
        {projects &&
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </Card>
    </Layout>
  );
};

export default HomeScreen;
