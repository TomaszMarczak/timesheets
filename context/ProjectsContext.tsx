import { useContext, createContext, useState, useEffect } from "react";
import { Project } from "../models/Project";
import {
  loadProjects,
  removeProject,
  saveProject,
  updateContractors,
  updateProjects,
} from "../helpers/ProjectHandling";
import { Contractor } from "../models/Contractor";

interface ProjectsContextTypes {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  updateProject: (project: Project) => void;
  updateContractor: (projectId: string, contractor: Contractor) => void;
}
interface ContextProviderProps {
  children: React.ReactNode;
}

const ProjectsContext = createContext({} as ProjectsContextTypes);

export const useProjectsContext = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }: ContextProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    saveProject(project).then((projects) => setProjects(projects));
  };

  const deleteProject = (projectId: string) => {
    removeProject(projectId).then((projects) => setProjects(projects));
  };

  const updateProject = (project: Project) => {
    updateProjects(project).then((projects) => setProjects(projects));
  };

  const updateContractor = (projectId: string, contractor: Contractor) => {
    updateContractors(projectId, contractor).then((projects) =>
      setProjects(projects)
    );
  };

  useEffect(() => {
    loadProjects().then((projects) => {
      setProjects(projects);
    });
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        updateProject,
        updateContractor,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
