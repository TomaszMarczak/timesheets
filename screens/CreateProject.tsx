import { Row, SafeAreaView } from "../components/View";
import { ButtonGroup, Overlay } from "@rneui/themed";
import { Subtitle, Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { Button } from "../components/Button";
import { Container } from "../components/View";
import { NumericInput, TextInput } from "../components/Input";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Project } from "../models/Project";
import { useUserContext } from "../context/UserContext";
import { Card } from "../components/Card";
import { ScrollView } from "react-native";
import {
  WeekdaySelectableButton,
  weekdays,
} from "../components/WeekdaySelectableButton";

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
    navigation.navigate("HomeScreen", { isLoading: false });
  };
  const handleCancel = async () => {
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
      return;
    }
    //If the value is not empty, set it to the working hours array.
    if (!isNaN(parseInt(value))) {
      const newWorkingHours = [...workingHours];
      newWorkingHours[visible as number] = parseInt(value);
      setWorkingHours(newWorkingHours);
    }
  };

  //Testing
  useEffect(() => {
    console.log(workingHours);
  }, [workingHours]);

  return (
    <ScrollView>
      <SafeAreaView>
        <Title>Create new project</Title>
        <Card>
          <Subtitle>Project name</Subtitle>
          <TextInput
            onChangeText={setProjectName}
            value={projectName}
            placeholder="Enter project name..."
          />
        </Card>
        <Card>
          <Subtitle>Typical working hours</Subtitle>
          <NumericInput
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
          <Subtitle>Typical project working days</Subtitle>
          {weekdays.map((weekday, index) => (
            <WeekdaySelectableButton
              key={index}
              weekday={weekday}
              index={index}
              defaultWorkingHours={defaultWorkingHours}
              workingHours={workingHours}
              setVisible={() => setVisible(index)}
              setWorkingHours={setWorkingHours}
            />
          ))}
        </Card>
        <Row>
          <Button secondary onPress={handleCancel}>
            <Text>Cancel</Text>
          </Button>
          <Button primary onPress={handleSave}>
            <Text>Save</Text>
          </Button>
        </Row>
        {visible != null && (
          <Overlay isVisible={true} onBackdropPress={() => setVisible(null)}>
            <Card>
              <Subtitle>{`Edit working hours for ${
                weekdays[visible as number]
              }`}</Subtitle>
              <TextInput
                value={workingHours[visible as number].toString()}
                onChangeText={handleChangeWeekdayWorkingHours}
                selectTextOnFocus
              />
            </Card>
          </Overlay>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default CreateProject;
