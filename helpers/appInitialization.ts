import { setUserId, setUserName } from "../redux/userSlice";
import { store } from "../redux/store";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

//On app startup check if user has id saved in device storage, if not generate uuid and save it to device storage
//If user has id saved in device storage, load it into redux store
//Render loading screen while app is initializing

//If user has name saved in device storage, load it into redux store
//If user has no name saved in device storage, save "Default username" to device storage and load it into redux store
//If user enters name, save it to device storage and load it into redux store

//Below function should be a promise that resolves to true when app is initialized

export const appInitialization = async () => {
  try {
    let userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      userId = uuid.v4() as string;
      await AsyncStorage.setItem("userId", userId);
    }
    store.dispatch(setUserId(userId));

    let userName = await AsyncStorage.getItem("userName");
    if (!userName) {
      userName = "Default username";
      await AsyncStorage.setItem("userName", "Default username");
    }

    store.dispatch(setUserName(userName));

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
