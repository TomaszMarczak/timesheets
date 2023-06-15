import React from "react";
import { Row, SafeAreaView } from "../components/View";
import { Card } from "../components/Card";
import { Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { useUserContext } from "../context/UserContext";
import { LinkButton } from "../components/Button";
import { Layout } from "../components/Layout";

const HomeScreen = () => {
  const { userName, userId } = useUserContext();

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
          <LinkButton to="CreateProject" title="Create new" />
        </Row>
      </Card>
    </Layout>
  );
};

export default HomeScreen;
