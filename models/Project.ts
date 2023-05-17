import { Contractor } from "./Contractor";

export interface Project {
  id: string;
  name: string;
  owner: string;
  workingHours: number[];
  contractors: Contractor[];
}
