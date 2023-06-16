import AsyncStorage from "@react-native-async-storage/async-storage";
import { Project } from "../models/Project";

export const loadProjects = async () => {
  try {
    const projects = await AsyncStorage.getItem("projects");
    if (projects) {
      return JSON.parse(projects);
    }
    return [];
  } catch (e) {
    console.log("Error loading projects");
    console.log(e);
    return [];
  }
};

export const saveProject = async (project: Project) => {
  try {
    const projects = await loadProjects();
    projects.push(project);
    await AsyncStorage.setItem("projects", JSON.stringify(projects));
    return projects;
  } catch (e) {
    console.log("Error saving projects");
    console.log(e);
    return [];
  }
};

export const removeProject = async (projectId: string) => {
  try {
    const projects = await loadProjects();
    const updatedProjects = projects.filter(
      (project: Project) => project.id !== projectId
    );
    await AsyncStorage.setItem("projects", JSON.stringify(updatedProjects));
    return updatedProjects;
  } catch (e) {
    console.log("Error deleting projects");
    console.log(e);
    return [];
  }
};
