//Screen for saving/editing name of the user in local storage and in redux store

import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Input } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setUserName } from "../redux/userSlice";
import { store } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/settings";

const ChangeName = () => {
  //Set name to value from redux store
  const [name, setName] = useState(store.getState().user.userName);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const handleSave = async () => {
    //Set name cannot be empty
    if (name === "") {
      return;
    }
    //Save name to async storage and redux store
    await AsyncStorage.setItem("userName", name);
    dispatch(setUserName(name));
    //Navigate to HomeScreen
    navigation.navigate("HomeScreen", { isLoading: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Enter your name</Text>
      <Input
        inputStyle={{ padding: 10 }}
        containerStyle={styles.inputArea}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name..."
      />
      <Button type="outline" title="Save" onPress={handleSave} />
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
  inputArea: {
    width: 200,
    alignItems: "center",
  },
});

export default ChangeName;
