import React, { useState, useRef } from "react";
import { Card } from "../components/Card";
import { Subtitle, Title } from "../components/Text";
import { Text } from "@rneui/themed";
import { Button } from "../components/Button";
import { Row, SafeAreaView } from "../components/View";
import { Pressable } from "react-native";
import { TextInput } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../context/UserContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { Layout } from "../components/Layout";

const ChangeName = () => {
  const { userName, setNewUserName } = useUserContext();
  const [error, setError] = useState<string>("");
  const newNameRef = useRef(userName);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const trimName = (name: string) => {
    return name.trim().replace(/\s{2,}/g, " ");
  };

  const validateName = (name: string) => {
    if (name.match(/^(?!.*\s{2})[A-Za-z\s]+$/)) {
      return true;
    } else if (name === "") {
      setError("Name cannot be empty.");
      return false;
    } else if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return false;
    } else if (name.length > 20) {
      setError("Name must be less than 20 characters long.");
      return false;
    } else {
      setError("Name must contain only letters and spaces.");
      return false;
    }
  };

  const handleSave = () => {
    if (validateName(newNameRef.current)) {
      setNewUserName(trimName(newNameRef.current));
      navigation.goBack();
    }
  };

  const handleCancel = async () => {
    //Go back to HomeScreen
    navigation.navigate("HomeScreen", { isLoading: false });
  };

  return (
    <Layout>
      <Title>Change your name</Title>
      <Card>
        <Subtitle>Enter your name:</Subtitle>
        <TextInput
          placeholder="Enter your name..."
          defaultValue={userName}
          onChange={(e) => {
            newNameRef.current = e.nativeEvent.text;
          }}
          selectTextOnFocus
          onKeyPress={(e) => {
            e.nativeEvent.key === "Enter" && handleSave();
          }}
        />
      </Card>
      <Row>
        <Button secondary onPress={handleCancel} title="Cancel" />
        <Button primary onPress={handleSave} title="Save" />
      </Row>
    </Layout>
  );
};

export default ChangeName;
