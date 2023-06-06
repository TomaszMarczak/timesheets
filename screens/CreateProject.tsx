import { Row, SafeAreaView, ScrollView } from "../components/View";
import { ButtonGroup, Overlay } from "@rneui/themed";
import { Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { Button } from "../components/Button";
import { View } from "../components/View";
import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Project } from "../models/Project";
import { TouchableOpacity } from "react-native";
import { useUserContext } from "../context/UserContext";
import { WeekdaySelectableButton } from "../components/SelectableButton";
import { Card } from "../components/Card";

const CreateProject = () => {
  const { userId } = useUserContext();
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState(uuid.v4() as string);
  const navigation = useNavigation<StackNavigationProp<any>>();
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
      owner: userId,
      workingHours: workingHours,
      contractors: [],
    };
    //Save to local storage projects array
    const projects = await AsyncStorage.getItem("projects");
    if (projects) {
      const newProjects = JSON.parse(projects);
      newProjects.push(project);
      await AsyncStorage.setItem("projects", JSON.stringify(newProjects));
    } else {
      await AsyncStorage.setItem("projects", JSON.stringify([project]));
    }
    //Go back to HomeScreen
    navigation.navigate("HomeScreen", { isLoading: false });
  };
  const handleCancel = async () => {
    //Go back to HomeScreen
    navigation.navigate("HomeScreen", { isLoading: false });
  };

  const addDefaultWorkingHours = (index: number) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index] = defaultWorkingHours as number;
    setWorkingHours(newWorkingHours);
  };

  const clearWorkingHours = (index: number) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index] = 0;
    setWorkingHours(newWorkingHours);
  };

  const handlePress = (index: number) =>
    workingHours[index] === 0
      ? addDefaultWorkingHours(index)
      : clearWorkingHours(index);

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
      return;
    }
    //If the value is not empty, set it to the working hours array.
    if (!isNaN(parseInt(value))) {
      const newWorkingHours = [...workingHours];
      newWorkingHours[visible as number] = parseInt(value);
      setWorkingHours(newWorkingHours);
    }
  };
  const buttons = weekdays.map((weekday, index) => {
    return {
      element: () => (
        <TouchableOpacity
          onLongPress={() => setVisible(index)}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: workingHours[index] === 0 ? "white" : "lightblue",
          }}
          onPress={() => handlePress(index)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                color: workingHours[index] === 0 ? "black" : "darkblue",
              }}
            >
              {weekday}
            </Text>
            {workingHours[index] !== 0 && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  width: "20%",
                  height: "100%",
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "darkblue",
                  }}
                >
                  {workingHours[index]}h
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    };
  });

  return (
    <ScrollView>
      <SafeAreaView>
        <Title>Create new project</Title>
        <Card>
          <Text>Project name</Text>
          <Input
            onChangeText={setProjectName}
            value={projectName}
            placeholder="Enter project name..."
          />
        </Card>
        <Card>
          <Text>Typical working hours</Text>
          <Input
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
        </Card>
        <Card>
          <Text>Typical project working days</Text>
          <ButtonGroup buttons={buttons} vertical selectMultiple />
          {visible != null && (
            <Overlay isVisible={true} onBackdropPress={() => setVisible(null)}>
              <Text>{`Edit working hours for ${
                weekdays[visible as number]
              }`}</Text>
              <Input
                value={workingHours[visible as number].toString()}
                onChangeText={handleChangeWeekdayWorkingHours}
                selectTextOnFocus
              />
            </Overlay>
          )}
        </Card>
        <Row>
          <Button secondary onPress={handleCancel}>
            <Text>Cancel</Text>
          </Button>
          <Button primary onPress={handleSave}>
            <Text>Save</Text>
          </Button>
        </Row>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CreateProject;
