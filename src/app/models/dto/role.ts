import { Employee } from "./employee";

export type Role = {
  Id: string;
  Name: string;
  Enabled: boolean;
  Employees?: Employee[];
}
