import React from "react";

import { SafeAreaView } from "../components/View";
import { Card } from "../components/Card";
import { Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { Link } from "@react-navigation/native";
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
        <LinkButton to="ChangeName">
          <Text>Change name</Text>
        </LinkButton>
      </Card>
      <Card>
        <Title>Projects</Title>
        <LinkButton to="CreateProject">
          <Text>Create new</Text>
        </LinkButton>
      </Card>
    </SafeAreaView>
  );
};

export default HomeScreen;
