import { Role } from "./role";

export type Employee = {
  Id: string;
  GivenName: string;
  FamilyName: string;
  Mail: string;
  RoleId: string;
  Role: Pick<Role, 'Name'>
}
