import React, { useState } from "react";
import { Row, SafeAreaView } from "../components/View";
import { Card } from "../components/Card";
import { Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { useUserContext } from "../context/UserContext";
import { useProjectsContext } from "../context/ProjectsContext";
import { Button, LinkButton } from "../components/Button";
import { Layout } from "../components/Layouts/Layout";
import { ProjectCard } from "../components/Project/ProjectCard";
import { QRCodeScanner } from "../components/QRCodeScanner";

const HomeScreen = () => {
  const { userName, userId } = useUserContext();
  const { projects } = useProjectsContext();

  const [openQRCodeScanner, setOpenQRCodeScanner] = useState(false);

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
          <Button
            title="Join existing"
            onPress={() => setOpenQRCodeScanner(true)}
          />
        </Row>
        {projects &&
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </Card>
      {openQRCodeScanner && (
        <SafeAreaView>
          <Button
            title="Close"
            onPress={() => setOpenQRCodeScanner(false)}
            style={{ position: "absolute", top: 0, right: 0 }}
          />
          <QRCodeScanner />
        </SafeAreaView>
      )}
    </Layout>
  );
};

export default HomeScreen;
