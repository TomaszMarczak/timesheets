import React from "react";
import { Row, SafeAreaView } from "../components/View";
import { Card } from "../components/Card";
import { Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { useUserContext } from "../context/UserContext";
import { LinkButton } from "../components/Button";

const HomeScreen = () => {
  const { userName, userId } = useUserContext();

  return (
    <SafeAreaView>
      <Card>
        <Title>User</Title>
        <Text>Username: {userName}</Text>
        <Text>UserId: {userId}</Text>
        <Row>
          <LinkButton to="ChangeName">
            <Text>Change name</Text>
          </LinkButton>
        </Row>
      </Card>
      <Card>
        <Title>Projects</Title>
        <Row>
          <LinkButton to="CreateProject">
            <Text>Create new</Text>
          </LinkButton>
        </Row>
      </Card>
    </SafeAreaView>
  );
};

export default HomeScreen;
