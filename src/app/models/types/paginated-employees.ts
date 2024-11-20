import { Employee } from "@models/dto/employee";

export type PaginatedEmployees = {
    value: Employee[];
    count: number;
};