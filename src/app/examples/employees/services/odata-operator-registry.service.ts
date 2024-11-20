import { Injectable } from "@angular/core";
import { ContainsOperator, EqualsOperator, IODataOperator, NotContainsOperator, NotEqualsOperator, StartsWithOperator } from "../operators/operators";
type OperatorMap = Map<string, IODataOperator>;

@Injectable()
export class ODataOperatorRegistry {
    private readonly operators: OperatorMap;

    constructor() {
        this.operators = new Map([
            ['startsWith', new StartsWithOperator()],
            ['contains', new ContainsOperator()],
            ['notContains', new NotContainsOperator()],
            ['equals', new EqualsOperator()],
            ['notEquals', new NotEqualsOperator()],
            // ... altri operatori
        ]);
    }

    getOperator(matchMode: string): IODataOperator | undefined {
        const operator = this.operators.get(matchMode);

        if (!operator)
            console.warn(`Operator matching '${matchMode}' not registered yet`);

        return operator;
    }

    registerOperator(matchMode: string, operator: IODataOperator): void {
        this.operators.set(matchMode, operator);
    }
}