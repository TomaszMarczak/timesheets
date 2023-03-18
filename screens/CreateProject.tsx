import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Button, ButtonGroup, Overlay } from "@rneui/themed";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/settings";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const projectId = uuid.v4() as string;
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedIndexes, setSelectedIndexes] = useState([] as number[]);
  const [defaultWorkingHours, setDefaultWorkingHours] = useState(12 as number);
  const [workingHours, setWorkingHours] = useState(() => {
    return [0, 0, 0, 0, 0, 0, 0];
  });
  const [visible, setVisible] = useState<number | null>();

  const handleSave = async () => {};
  const handleCancel = async () => {
    //Go back to HomeScreen
    navigation.navigate("HomeScreen", { isLoading: false });
  };

  const handleChangeWorkingHours = (value: string) => {
    //Cannot be less than 0 and more than 24
    if (parseInt(value) < 0 || parseInt(value) > 24) return;
    setDefaultWorkingHours(parseInt(value));
  };

  const handleChangeWeekdayWorkingHours = (value: string) => {
    //Cannot be less than 0 and more than 24
    if (parseInt(value) < 0 || parseInt(value) > 24) return;
    const newWorkingHours = [...workingHours];
    newWorkingHours[visible as number] = parseInt(value);
    setWorkingHours(newWorkingHours);
    const newSelectedIndexes = [...selectedIndexes];
    if (!newSelectedIndexes.includes(visible as number)) {
      newSelectedIndexes.push(visible as number);
    }
    setSelectedIndexes(newSelectedIndexes);
  };

  const handleWeekdaySelection = (value: number[]) => {
    //Check if working hours for selected weekdays are set, if not - set them to default, if yes - leave them as they are
    const newWorkingHours = [...workingHours];
    value.forEach((index) => {
      if (newWorkingHours[index] === 0) {
        newWorkingHours[index] = defaultWorkingHours;
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

  //TESTING
  useEffect(() => {
    console.log(workingHours);
  }, [workingHours]);

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
        value={defaultWorkingHours.toString()}
        onChangeText={handleChangeWorkingHours}
      />

      <Text style={styles.title}>Typical project working days</Text>
      <ButtonGroup
        buttons={[
          `Monday ${workingHours[0]}`,
          `Tuesday ${workingHours[1]}`,
          `Wednesday ${workingHours[2]}`,
          `Thursday ${workingHours[3]}`,
          `Friday ${workingHours[4]}`,
          `Saturday ${workingHours[5]}`,
          `Sunday ${workingHours[6]}`,
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
            ? value.target // web
            : value.nativeEvent.target; // mobile
          console.log(target);
          if (target.innerText?.includes("Monday")) {
            setVisible(0);
          }
          if (target.innerText?.includes("Tuesday")) {
            setVisible(1);
          }
          if (target.innerText?.includes("Wednesday")) {
            setVisible(2);
          }
          if (target.innerText?.includes("Thursday")) {
            setVisible(3);
          }
          if (target.innerText?.includes("Friday")) {
            setVisible(4);
          }
          if (target.innerText?.includes("Saturday")) {
            setVisible(5);
          }
          if (target.innerText?.includes("Sunday")) {
            setVisible(6);
          }
        }}
      />
      {visible != null && (
        <Overlay isVisible={true} onBackdropPress={() => setVisible(null)}>
          <Text>Edit working hours for weekday</Text>
          <Input
            containerStyle={styles.inputArea}
            value={workingHours[visible as number].toString()}
            onChangeText={handleChangeWeekdayWorkingHours}
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
