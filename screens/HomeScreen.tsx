import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { View, SafeAreaView } from "../components/View";
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
        <Link to={`/ChangeName`}>
          <Button>Change name</Button>
        </Link>
      </Card>
      <View>
        <Card>
          <Title>Projects</Title>
          <Card>
            <Title>Project 1</Title>
            <Text>Project 1 description</Text>
          </Card>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
