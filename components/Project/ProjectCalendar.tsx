import { useMemo, useState } from "react";
import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { WorkdayModal } from "../WorkdayModal";
import { Project } from "../../models/Project";
import { useProjectsContext } from "../../context/ProjectsContext";
import { Card } from "@rneui/themed";
import { Subtitle } from "../Text";
import { Text } from "@rneui/themed";
import { useUserContext } from "../../context/UserContext";

interface ProjectCalendarProps {
  projectId: string;
}

export const ProjectCalendar = ({ projectId }: ProjectCalendarProps) => {
  const { projects } = useProjectsContext();
  const { userId } = useUserContext();
  const project = projects.find((p) => p.id === projectId);
  const [chosenDate, setChosenDate] = useState<DateData | null>(null);

  if (project === undefined) {
    return null;
  }

  interface MarkedDates {
    [date: string]: {
      marked: boolean;
      dotColor?: string;
    };
  }

  const markedDates = useMemo(() => {
    const myCalendar = project.contractors.find(
      (contractor) => contractor.id === userId
    )?.calendar;
    if (myCalendar === undefined) {
      return {};
    }
    const dates = myCalendar?.reduce((acc, curr) => {
      const weekday = (new Date(curr.date).getDay() + 6) % 7;
      const dotColor =
        curr.hours < project.workingHours[weekday]
          ? "red"
          : curr.hours > project.workingHours[weekday]
          ? "blue"
          : "green";

      return {
        ...acc,
        [curr.date]: {
          marked: true,
          dotColor: dotColor,
        },
      };
    }, {} as MarkedDates);

    return dates;
  }, [project, userId]);

  return (
    <View>
      <Calendar
        markedDates={markedDates}
        onDayLongPress={(day) => setChosenDate(day)}
        firstDay={1}
      />
      <WorkdayModal
        isVisible={chosenDate !== null}
        closeModal={() => setChosenDate(null)}
        chosenDate={chosenDate}
        projectId={projectId}
      />
    </View>
  );
};
