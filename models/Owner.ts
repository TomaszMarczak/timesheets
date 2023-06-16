import { Contractor } from "./Contractor";

export type Owner = Pick<Contractor, "id" | "name">;
