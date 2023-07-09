import AsyncStorage from "@react-native-async-storage/async-storage";
import { Project } from "../models/Project";
import { Contractor } from "../models/Contractor";

export const loadProjects = async (): Promise<Project[]> => {
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

export const saveProject = async (project: Project): Promise<Project[]> => {
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

export const removeProject = async (projectId: string): Promise<Project[]> => {
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

export const updateProjects = async (project: Project): Promise<Project[]> => {
  try {
    const projects = await loadProjects();
    const updatedProjects = projects.map((p: Project) => {
      if (p.id === project.id) {
        return project;
      }
      return p;
    });
    await AsyncStorage.setItem("projects", JSON.stringify(updatedProjects));
    return updatedProjects;
  } catch (e) {
    console.log("Error updating projects");
    console.log(e);
    return [];
  }
};

export const updateContractors = async (
  projectId: string,
  contractor: Contractor
) => {
  try {
    const projects = await loadProjects();
    const projectToUpdate = projects.find(
      (project: Project) => project.id === projectId
    );
    if (!projectToUpdate) {
      return [];
    }
    const updatedContractors = projectToUpdate.contractors.map(
      (c: Contractor) => {
        if (c.id === contractor.id) {
          return contractor;
        }
        return c;
      }
    );
    const updatedProject = {
      ...projectToUpdate,
      contractors: updatedContractors,
    };
    const updatedProjects = projects.map((p: Project) => {
      if (p.id === projectId) {
        return updatedProject;
      }
      return p;
    });

    await AsyncStorage.setItem("projects", JSON.stringify(updatedProjects));
    return updatedProjects;
  } catch (e) {
    console.log("Error updating contractors");
    console.log(e);
    return [];
  }
};
