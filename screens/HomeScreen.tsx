import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/settings";
import { StackNavigationProp } from "@react-navigation/stack";

type ScreenTypes = {
  isLoading: boolean;
};

const HomeScreen = ({ isLoading }: ScreenTypes) => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const userId = useSelector((state: RootState) => state.user.userId);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TimeSheets</Text>
      <Text>Username: {userName}</Text>
      <Text>UserId: {userId}</Text>
      <Pressable>
        <Link style={styles.linkPrimary} to="/ChangeName">
          Change your username
        </Link>
      </Pressable>
      <View style={styles.section}>
        <Text style={styles.title}>Projects</Text>
        <View style={styles.buttons}>
          <Pressable>
            <Link style={styles.linkPrimary} to="/CreateProject">
              <Text>Create a new project</Text>
            </Link>
          </Pressable>
          <Pressable>
            <Link style={styles.linkSecondary} to="/JoinProject">
              <Text>Join existing project</Text>
            </Link>
          </Pressable>
        </View>
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
