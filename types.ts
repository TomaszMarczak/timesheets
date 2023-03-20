export type Workday = {
  date: string;
  hours: number;
  comment: string;
};

export type Contractor = {
  id: string;
  name: string;
  calendar: Workday[];
};

export type Project = {
  id: string;
  name: string;
  owner: string;
  workingHours: number[];
  contractors: Contractor[];
};
