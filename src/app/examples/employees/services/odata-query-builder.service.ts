import { inject, Injectable } from '@angular/core';
import { FilterOperator } from 'primeng/api';
import { IFilterEvent } from '../../../models/interfaces/interfaces';
import { ODataExpressionBuilder } from './odata-espression-builder.service';

@Injectable({
  providedIn: 'root',
})
export class ODataQueryBuilderService {
  private static readonly DEFAULT_OPERATOR: FilterOperator = 'and';
  private readonly expressionBuilder = inject(ODataExpressionBuilder);
  
  buildQuery(filterEvent: IFilterEvent): string {
    try {
      const filters = filterEvent.filters || {};
      const expressions = this.expressionBuilder.buildExpressions(filters);
      
      if (expressions.length === 0) return '';
  
      const operator = filterEvent.operator ?? ODataQueryBuilderService.DEFAULT_OPERATOR;
      return expressions.join(` ${operator} `);
    } catch (error) {
      console.error('Error building OData query:', error);
      return '';
    }
  }
}
