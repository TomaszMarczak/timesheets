import { StackNavigationProp } from "@react-navigation/stack";
import { Project } from "./Project";

export type RootStackParamList = {
  HomeScreen: undefined;
  CreateUpdateProject: { project?: Project };
  ChangeName: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
