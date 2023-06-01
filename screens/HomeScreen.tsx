import React from "react";

import { SafeAreaView } from "../components/View";
import { Card } from "../components/Card";
import { Text, Title } from "../components/Text";
import { Link } from "@react-navigation/native";
import { useUserContext } from "../context/UserContext";
import { Button } from "../components/Button";

const HomeScreen = () => {
  const { userName, userId } = useUserContext();

  return (
    <SafeAreaView>
      <Card>
        <Title>User</Title>
        <Text>Username: {userName}</Text>
        <Text>UserId: {userId}</Text>
        <Link style={{ backgroundColor: "red" }} to={`/ChangeName`}>
          <Button>
            <Text>Change name</Text>
          </Button>
        </Link>
      </Card>
      <Card>
        <Title>Projects</Title>
        <Link to={`/CreateProject`}>
          <Button>
            <Text>Create new</Text>
          </Button>
        </Link>
      </Card>
    </SafeAreaView>
  );
};

export default HomeScreen;
