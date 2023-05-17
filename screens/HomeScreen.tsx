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
          <Button secondary>Change your name</Button>
        </Link>
      </Card>
      <View>
        <Card>
          <Title>Projects</Title>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginTop: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 25,
  },
  text: {
    fontSize: 20,
    marginBottom: 0,
  },
  linkPrimary: {
    color: "darkblue",
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "lightblue",
  },
  linkSecondary: {
    color: "darkred",
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "lightcoral",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default HomeScreen;
