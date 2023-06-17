import React from "react";
import { Row, SafeAreaView } from "../components/View";
import { Card } from "../components/Card";
import { Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { useUserContext } from "../context/UserContext";
import { useProjectsContext } from "../context/ProjectsContext";
import { LinkButton } from "../components/Button";
import { Layout } from "../components/Layouts/Layout";
import { ProjectCard } from "../components/Project/ProjectCard";

const HomeScreen = () => {
  const { userName, userId } = useUserContext();
  const { projects } = useProjectsContext();

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
