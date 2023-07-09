import { useState } from "react";
import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { WorkdayModal } from "./WorkdayModal";

interface ProjectCalendarProps {}

export const ProjectCalendar = (props: ProjectCalendarProps) => {
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
      />
    </View>
  );
};
