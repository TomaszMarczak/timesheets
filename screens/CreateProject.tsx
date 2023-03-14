import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch, Input, Button } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet } from "react-native";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/settings";

//Create new project. After creation, user is redirected to the HomeScreen.
//User can create a new project by entering a project name and clicking the "Create" button.
//User can cancel the creation of a new project by clicking the "Cancel" button.
//User can not create a new project without entering a project name.
//User can not create a new project with a project name that already exists.
//User can not create a new project with a project name that is longer than 50 characters.
//User can not create a new project with a project name that contains only numbers.
//User can not create a new project with a project name that contains only special characters and spaces.

//Project creation generates a unique project ID and all data added to existing projects list

//Screen for saving/editing name of the user in local storage and in redux store

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const projectId = uuid.v4() as string;
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSave = async () => {
    //Save name to async storage and redux store
    await AsyncStorage.setItem("projectName", projectName);
    await AsyncStorage.setItem("projectId", projectId);
  };
  const handleCancel = async () => {
    //Go back to HomeScreen
    navigation.navigate("HomeScreen", { isLoading: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        containerStyle={styles.inputArea}
        inputStyle={{ padding: 10 }}
        onChangeText={setProjectName}
        value={projectName}
        placeholder="Enter project name..."
      />
      <Text style={styles.title}>Typical project working days</Text>
      <View style={styles.weekdays}>
        <View style={styles.weekday}>
          <Text style={styles.text}>Monday</Text>
          <Switch />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button color="lightcoral" title="Cancel" onPress={handleCancel} />
        <Button title="Create" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
  weekday: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputArea: {
    width: 200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
});

export default CreateProject;
