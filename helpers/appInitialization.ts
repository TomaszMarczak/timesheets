import { setUserId, setUserName } from "../redux/userSlice";
import { store } from "../redux/store";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

//On app startup check if user has id saved in device storage, if not generate uuid and save it to device storage
//If user has id saved in device storage, load it into redux store
//Render loading screen while app is initializing

//If user has name saved in device storage, load it into redux store
//If user has no name saved in device storage, prompt user to enter name
//If user enters name, save it to device storage and load it into redux store

export const appInitialization = async () => {
  //Get user id from device storage
  const userId = await AsyncStorage.getItem("userId");

  //If user id is not found in device storage, generate uuid and save it to device storage
  if (!userId) {
    const uuid = uuidv4();
    await AsyncStorage.setItem("userId", uuid);
    store.dispatch(setUserId(uuid));
  } else {
    //If user id is found in device storage, load it into redux store
    store.dispatch(setUserId(userId));
  }

  //Get user name from device storage
  const userName = await AsyncStorage.getItem("userName");

  //If user name is found in device storage, load it into redux store
  userName
    ? store.dispatch(setUserName(userName))
    : store.dispatch(setUserName(""));
};
