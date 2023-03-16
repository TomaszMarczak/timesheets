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

  const toggleOverlay = (weekdayIndex: number) => {
    setVisible(weekdayIndex);
  };

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
    //Update the workingHours array
    const newWorkingHours = [...workingHours];
    newWorkingHours[visible as number] = parseInt(value);
    setWorkingHours(newWorkingHours);
  };

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
          `Monday ${selectedIndexes.includes(0) ? workingHours[0] : ""}`,
          `Tuesday ${selectedIndexes.includes(1) ? workingHours[1] : ""}`,
          `Wednesday ${selectedIndexes.includes(2) ? workingHours[2] : ""}`,
          `Thursday`,
          `Friday`,
          `Saturday`,
          `Sunday`,
        ]}
        textStyle={{ fontSize: 12 }}
        buttonStyle={{ width: 200 }}
        vertical
        selectMultiple
        selectedIndexes={selectedIndexes}
        onPress={(value) => {
          setWorkingHours((prev) => {
            const newWorkingHours = [...prev];
            newWorkingHours[value] = defaultWorkingHours;
            return newWorkingHours;
          });

          setSelectedIndexes(value);
        }}
        onLongPress={(value) => {
          const target = value.target
            ? value.target // web
            : value.nativeEvent.target; // mobile
          console.log(target);
          if (target.innerText?.includes("Monday")) {
            toggleOverlay(0);
          }
          if (target.innerText?.includes("Tuesday")) {
            toggleOverlay(1);
          }
          if (target.innerText?.includes("Wednesday")) {
            toggleOverlay(2);
          }
          if (target.innerText?.includes("Thursday")) {
            toggleOverlay(3);
          }
          if (target.innerText?.includes("Friday")) {
            toggleOverlay(4);
          }
          if (target.innerText?.includes("Saturday")) {
            toggleOverlay(5);
          }
          if (target.innerText?.includes("Sunday")) {
            toggleOverlay(6);
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
