import { Injectable, inject } from "@angular/core";
import { IFilterCondition } from "../../../models/interfaces/interfaces";
import { ODataOperatorRegistry } from "./odata-operator-registry.service";

@Injectable()
export class ODataExpressionBuilder {
  private readonly operatorRegistry = inject(ODataOperatorRegistry);

  buildExpressions(filters: { [key: string]: IFilterCondition }): string[] {
    return Object.entries(filters)
      .filter(([_, condition]) => this.isValidCondition(condition))
      .map(([field, condition]) => this.createExpression(field, condition))
      .filter((expression): expression is string => expression !== undefined);
  }

  private isValidCondition(condition: IFilterCondition): boolean {
    return condition?.value != null && condition?.matchMode != null;
  }

  private createExpression(
    field: string,
    condition: IFilterCondition
  ): string | undefined {
    const operator = this.operatorRegistry.getOperator(condition.matchMode);
    if (!operator) return undefined;

    return operator.createExpression(field, condition.value);
  }
}