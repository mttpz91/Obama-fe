import { FilterOperator } from 'primeng/api';

export interface IFilterCondition {
  value: any;
  matchMode: string;
}

export interface IFilterEvent {
  filters: { [key: string]: IFilterCondition };
  operator?: FilterOperator;
}