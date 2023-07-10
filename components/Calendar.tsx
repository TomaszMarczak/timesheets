import { useState } from "react";
import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { WorkdayModal } from "./WorkdayModal";
import { Project } from "../models/Project";

interface ProjectCalendarProps {
  project: Project;
}

export const ProjectCalendar = (props: ProjectCalendarProps) => {
  const { project } = props;
  const [chosenDate, setChosenDate] = useState<DateData | null>(null);

  return (
    <View>
      <Calendar
        markedDates={{
          "2023-07-07": { selected: true },
          "2023-07-08": { marked: true },
        }}
        onDayLongPress={(day) => setChosenDate(day)}
      />
      <WorkdayModal
        isVisible={chosenDate !== null}
        closeModal={() => setChosenDate(null)}
        chosenDate={chosenDate}
        project={project}
      />
    </View>
  );
};
