
export interface IODataOperator {
    createExpression(field: string, value: string): string;
}

export class StartsWithOperator implements IODataOperator {
    createExpression(field: string, value: string): string {
        return `startswith(${field},'${value}')`;
    }
}

export class ContainsOperator implements IODataOperator {
    createExpression(field: string, value: string): string {
        return `contains(${field},'${value}')`;
    }
}

export class NotContainsOperator implements IODataOperator {
    createExpression(field: string, value: string): string {
        return `not contains(${field},'${value}')`;
    }
}

export class EqualsOperator implements IODataOperator {
    createExpression(field: string, value: string): string {
        return `${field} eq '${value}'`;
    }
}

export class NotEqualsOperator implements IODataOperator {
    createExpression(field: string, value: string): string {
        return `${field} ne '${value}'`;
    }
}