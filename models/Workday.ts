import { Day } from "./Day";

export interface Workday extends Day {
  hours: number;
  comment: string;
}
