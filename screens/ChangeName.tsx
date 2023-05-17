import React, { useState, useRef } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "../components/View";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../context/UserContext";

const ChangeName = () => {
  const { userName, setNewUserName } = useUserContext();
  const newNameRef = useRef(userName);
  const navigation = useNavigation();

  const handleSubmit = () => {
    setNewUserName(newNameRef.current);
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Enter your name</Text>
      <Input
        inputStyle={{ padding: 10 }}
        containerStyle={styles.inputArea}
        placeholder="Enter your name..."
        defaultValue={userName}
        onChange={(e) => {
          newNameRef.current = e.nativeEvent.text;
        }}
        onKeyPress={(e) => {
          e.nativeEvent.key === "Enter" && handleSubmit();
        }}
      />
      <Button type="outline" title="Save" onPress={handleSubmit} />
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
