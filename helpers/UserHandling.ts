import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

const generateUserId = async () => {
  const userId = uuid.v4() as string;
  await AsyncStorage.setItem("userId", userId);
  return userId;
};

const loadUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      return userId;
    }
    return await generateUserId();
  } catch (e) {
    console.log("Error loading userId");
    console.log(e);
    return await generateUserId();
  }
};

const loadUserName = async () => {
  try {
    const userName = await AsyncStorage.getItem("userName");
    if (userName) {
      return userName;
    }
    return "Default UserName";
  } catch (e) {
    console.log("Error loading username");
    console.log(e);
    return "Default UserName";
  }
};

const saveUserName = async (username: string) => {
  try {
    await AsyncStorage.setItem("userName", username);
    return username;
  } catch (e) {
    console.log("Error saving userName");
    console.log(e);
    return "Default userName";
  }
};

export { loadUserId, loadUserName, saveUserName };
