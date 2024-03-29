import { StackNavigationProp } from "@react-navigation/stack";
import { Project } from "./Project";

export type RootStackParamList = {
  HomeScreen: undefined;
  ChangeName: undefined;
  CreateUpdateProject: { project?: Project };
  ProjectScreen: { project: Project };
  CameraScreen: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
