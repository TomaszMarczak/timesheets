import { useProjectsContext } from "../context/ProjectsContext";
import { useUserContext } from "../context/UserContext";
import { Workday } from "../models/Workday";

export const useCalendar = () => {
  const { userId, userName } = useUserContext();
  const { projects, updateContractor } = useProjectsContext();

  const addWorkday = (projectId: string, workday: Workday) => {
    //check if contractor exists if not create contractor
    const contractor = projects
      .find((p) => p.id === projectId)
      ?.contractors.find((c) => c.id === userId);
    if (!contractor) {
      console.log("Contractor not found");
      updateContractor(projectId, {
        id: userId,
        name: userName,
        calendar: [workday],
      });
      console.log("Contractor created");
      return;
    }
    //check if workday exists if not create workday
    const workdayExists = contractor?.calendar.find(
      (w) => w.date === workday.date
    );
    if (!workdayExists) {
      updateContractor(projectId, {
        ...contractor,
        calendar: [...contractor.calendar, workday],
      });
      return;
    }
    updateWorkday(projectId, workday);
  };

  const removeWorkday = (projectId: string, workday: Workday) => {
    const contracor = projects
      .find((p) => p.id === projectId)
      ?.contractors.find((c) => c.id === userId);
    if (!contracor) {
      return;
    }
    const updatedCalendar = contracor.calendar.filter(
      (w) => w.date !== workday.date
    );
    updateContractor(projectId, { ...contracor, calendar: updatedCalendar });
  };
  const updateWorkday = (projectId: string, workday: Workday) => {
    const contractor = projects
      .find((p) => p.id === projectId)
      ?.contractors.find((c) => c.id === userId);
    if (!contractor) {
      return;
    }
    const updatedCalendar = contractor.calendar.map((w) => {
      if (w.date === workday.date) {
        return workday;
      }
      return w;
    });
    updateContractor(projectId, { ...contractor, calendar: updatedCalendar });
  };

  return { addWorkday, removeWorkday, updateWorkday };
};
