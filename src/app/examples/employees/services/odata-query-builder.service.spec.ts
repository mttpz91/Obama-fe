import { TestBed } from '@angular/core/testing';
import { ODataExpressionBuilder } from './odata-espression-builder.service';
import { ODataOperatorRegistry } from './odata-operator-registry.service';

describe('ODataExpressionBuilder', () => {
  let service: ODataExpressionBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ODataExpressionBuilder,
        ODataOperatorRegistry,
      ]
    });
    service = TestBed.inject(ODataExpressionBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build valid expressions', () => {
    const filters = {
      name: { value: 'John', matchMode: 'contains' },
      age: { value: 30, matchMode: 'equals' }
    };

    const expressions = service.buildExpressions(filters);
    expect(expressions.length).toBe(2);
    expect(expressions[0]).toContain('contains');
    expect(expressions[1]).toContain('eq');
  });

  it('should filter out conditions with null value', () => {
    const filters = {
      name: { value: null, matchMode: 'contains' },
      age: { value: 30, matchMode: 'equals' }
    };

    const expressions = service.buildExpressions(filters);
    expect(expressions.length).toBe(1);
  });
});