import { Contractor } from "./Contractor";
import { Owner } from "./Owner";

export interface Project {
  id: string;
  name: string;
  owner: Owner;
  workingHours: number[];
  contractors: Contractor[];
  date: Date;
}
