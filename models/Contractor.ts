import { Workday } from "./Workday";

export interface Contractor {
  id: string;
  name: string;
  calendar: Workday[];
}
