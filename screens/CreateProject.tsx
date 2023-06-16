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
} from "../components/Weekdays/WeekdaySelectableButton";
import { Layout } from "../components/Layout";
import { WeekdayModal } from "../components/Weekdays/WeekdayModal";
import { useProjectsContext } from "../context/ProjectsContext";

const CreateProject = () => {
  const { userId, userName } = useUserContext();
  const { addProject } = useProjectsContext();
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState(uuid.v4() as string);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [defaultWorkingHours, setDefaultWorkingHours] = useState<number | "">(
    12 as number
  );
  const [workingHours, setWorkingHours] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [modalValue, setModalValue] = useState<number | null>();

  const handleSave = async () => {
    const project: Project = {
      id: projectId,
      name: projectName,
      owner: { id: userId, name: userName },
      workingHours: workingHours,
      contractors: [],
      date: new Date(),
    };

    addProject(project);
    setToDefault();
    navigation.navigate("HomeScreen");
  };

  const handleCancel = async () => {
    setToDefault();
    navigation.navigate("HomeScreen");
  };

  const setToDefault = () => {
    setProjectName("");
    setProjectId(uuid.v4() as string);
    setDefaultWorkingHours(12);
    setWorkingHours([0, 0, 0, 0, 0, 0, 0]);
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

  return (
    <ScrollView>
      <Layout>
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
              openModal={() => setModalValue(index)}
              setWorkingHours={setWorkingHours}
            />
          ))}
        </Card>
        <Row>
          <Button secondary onPress={handleCancel} title="Cancel" />
          <Button primary onPress={handleSave} title="Save" />
        </Row>
        {modalValue != null && (
          <WeekdayModal
            weekday={modalValue}
            workingHours={workingHours}
            setWorkingHours={setWorkingHours}
            closeModal={() => setModalValue(null)}
          />
        )}
      </Layout>
    </ScrollView>
  );
};

export default CreateProject;
