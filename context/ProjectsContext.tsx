import { useContext, createContext, useState, useEffect } from "react";
import { Project } from "../models/Project";
import {
  loadProjects,
  removeProject,
  saveProject,
} from "../helpers/ProjectHandling";

interface ProjectsContextTypes {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
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

  useEffect(() => {
    loadProjects().then((projects) => {
      setProjects(projects);
    });
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};
