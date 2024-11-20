import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '@models/dto/employee';
import { ODataCollectionResponse } from '@models/dto/odata-response';
import { PaginatedEmployees } from '@models/types/paginated-employees';
import {
  BehaviorSubject,
  map,
  Observable,
  switchMap
} from 'rxjs';
import { CustomHttpParamEncoder } from 'src/app/core/http/custom-http-param-encoder';


@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  private readonly apiUrl = '/odata/employees';
  private readonly includeRoleName = 'Role($select=Name)';
  private readonly http = inject(HttpClient);

  private readonly stateSubject = new BehaviorSubject<{
    filters: Record<string, string>;
    paging: Record<string, string>;
  }>({
    filters: {},
    paging: buildODataPaginationParams()
  });
  
  public employeesWithRole$ = this.stateSubject.pipe(
    switchMap(({ filters, paging }) => {
      const params = new HttpParams({
        encoder: new CustomHttpParamEncoder(),
        fromObject: { $expand: this.includeRoleName, ...filters, ...paging },
      });
  
      return this.getEmployees(params);
    })
  );

  public updateFilters(filters: string) {
    this.stateSubject.next({
      filters: filters ? { $filter: filters } : {},
      paging: buildODataPaginationParams(0)
    });
  }
  
  public updatePage(skip: number) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      paging: buildODataPaginationParams(skip)
    });
  }

  private getEmployees(params: HttpParams): Observable<PaginatedEmployees> {
    return this.http
      .get<ODataCollectionResponse<Employee>>(this.apiUrl, { params })
      .pipe(
        map((response) => ({
          value: response.value,
          count: response['@odata.count']!
        }))
      );
  }
}

function buildODataPaginationParams(
  skip = 0,
  top = 10,
  count = true
): Record<string, string> {
  return {
    $count: `${count}`,
    $top: `${top}`,
    $skip: `${skip}`,
  };
}
