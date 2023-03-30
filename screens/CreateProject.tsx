import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Button, ButtonGroup, Overlay } from "@rneui/themed";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/settings";
import { RootState } from "../redux/store";
import { setProjects } from "../redux/projectsSlice";
import { Project } from "../types";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const projectId = uuid.v4() as string;
  const projectOwner = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedIndexes, setSelectedIndexes] = useState([] as number[]);
  const [defaultWorkingHours, setDefaultWorkingHours] = useState<number | "">(
    12 as number
  );
  const [workingHours, setWorkingHours] = useState(() => {
    return [0, 0, 0, 0, 0, 0, 0];
  });
  const [visible, setVisible] = useState<number | null>();

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSave = async () => {
    const project: Project = {
      id: projectId,
      name: projectName,
      owner: projectOwner,
      workingHours: workingHours,
      contractors: [],
    };
    //Save to redux and local storage projects array
    const projects = await AsyncStorage.getItem("projects");
    if (projects) {
      const newProjects = JSON.parse(projects);
      newProjects.push(project);
      await AsyncStorage.setItem("projects", JSON.stringify(newProjects));
      dispatch(setProjects(newProjects));
    } else {
      await AsyncStorage.setItem("projects", JSON.stringify([project]));
      dispatch(setProjects([project]));
    }
    //Go back to HomeScreen
    navigation.navigate("HomeScreen", { isLoading: false });
  };
  const handleCancel = async () => {
    //Go back to HomeScreen
    navigation.navigate("HomeScreen", { isLoading: false });
  };

  const handleChangeWorkingHours = (value: string) => {
    //Enter only numbers, cannot be less than 0 and more than 24.
    if (parseInt(value) < 0 || parseInt(value) > 24) return;
    if (value === "") {
      setDefaultWorkingHours("");
      return;
    }
    if (!isNaN(parseInt(value))) setDefaultWorkingHours(parseInt(value));
  };

  const handleChangeWeekdayWorkingHours = (value: string) => {
    //Enter only numbers, cannot be less than 0 and more than 24.
    if (parseInt(value) < 0 || parseInt(value) > 24) return;
    if (value.startsWith("0") && /\D/.test(value)) return;
    if (value === "" || value === "0" || value === "00") {
      const newWorkingHours = [...workingHours];
      newWorkingHours[visible as number] = 0;
      setWorkingHours(newWorkingHours);
      //Remove the index from selectedIndexes
      const newSelectedIndexes = [...selectedIndexes].filter(
        (index) => index !== visible
      );
      setSelectedIndexes(newSelectedIndexes);
      return;
    }
    //If the value is not empty, set it to the working hours array.
    if (!isNaN(parseInt(value))) {
      const newWorkingHours = [...workingHours];
      newWorkingHours[visible as number] = parseInt(value);
      setWorkingHours(newWorkingHours);
      const newSelectedIndexes = [...selectedIndexes];
      if (!newSelectedIndexes.includes(visible as number)) {
        newSelectedIndexes.push(visible as number);
      }
      setSelectedIndexes(newSelectedIndexes);
    }
  };

  const handleWeekdaySelection = (value: number[]) => {
    //Check if working hours for selected weekdays are set, if not - set them to default, if yes - leave them as they are
    const newWorkingHours = [...workingHours];
    value.forEach((index) => {
      if (newWorkingHours[index] === 0) {
        newWorkingHours[index] = defaultWorkingHours as number;
      }
    });
    //Set the working hours for unselected weekdays to 0
    newWorkingHours.forEach((hours, index) => {
      if (!value.includes(index)) {
        newWorkingHours[index] = 0;
      }
    });
    setWorkingHours(newWorkingHours);
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
      <Text style={styles.title}>Typical working hours</Text>
      <Input
        containerStyle={styles.inputArea}
        keyboardType="numeric"
        selectTextOnFocus
        value={defaultWorkingHours?.toString()}
        onChangeText={(value) => handleChangeWorkingHours(value)}
        onBlur={(e) => {
          //If the value is empty, set it to 12
          if (e.nativeEvent.text === "") {
            setDefaultWorkingHours(12);
          }
        }}
      />

      <Text style={styles.title}>Typical project working days</Text>
      <ButtonGroup
        buttons={[
          `Monday ${workingHours[0] === 0 ? "" : workingHours[0] + "h"}`,
          `Tuesday ${workingHours[1] === 0 ? "" : workingHours[1] + "h"}`,
          `Wednesday ${workingHours[2] === 0 ? "" : workingHours[2] + "h"}`,
          `Thursday ${workingHours[3] === 0 ? "" : workingHours[3] + "h"}`,
          `Friday ${workingHours[4] === 0 ? "" : workingHours[4] + "h"}`,
          `Saturday ${workingHours[5] === 0 ? "" : workingHours[5] + "h"}`,
          `Sunday ${workingHours[6] === 0 ? "" : workingHours[6] + "h"}`,
        ]}
        textStyle={{ fontSize: 12 }}
        buttonStyle={{ width: 200 }}
        vertical
        selectMultiple
        selectedIndexes={selectedIndexes}
        onPress={(value) => {
          handleWeekdaySelection(value);
          setSelectedIndexes(value);
        }}
        onLongPress={(value) => {
          const target = value.target
            ? value.target.textContent // web
            : value.nativeEvent.target; // mobile
          if (target.includes("Monday")) {
            setVisible(0);
          }
          if (target.includes("Tuesday")) {
            setVisible(1);
          }
          if (target.includes("Wednesday")) {
            setVisible(2);
          }
          if (target.includes("Thursday")) {
            setVisible(3);
          }
          if (target.includes("Friday")) {
            setVisible(4);
          }
          if (target.includes("Saturday")) {
            setVisible(5);
          }
          if (target.includes("Sunday")) {
            setVisible(6);
          }
        }}
      />
      {visible != null && (
        <Overlay isVisible={true} onBackdropPress={() => setVisible(null)}>
          <Text>{`Edit working hours for ${weekdays[visible as number]}`}</Text>
          <Input
            containerStyle={styles.inputArea}
            value={workingHours[visible as number].toString()}
            onChangeText={handleChangeWeekdayWorkingHours}
            selectTextOnFocus
            onBlur={(e) => {
              //If the value is empty, set it to 0
              if (e.nativeEvent.text === "" || e.nativeEvent.text === "0") {
                const newWorkingHours = [...workingHours];
                newWorkingHours[visible as number] = 0;
                setWorkingHours(newWorkingHours);
                //Remove the index from selectedIndexes
                const newSelectedIndexes = [...selectedIndexes].filter(
                  (index) => index !== visible
                );
                setSelectedIndexes(newSelectedIndexes);
              }
            }}
          />
        </Overlay>
      )}
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
