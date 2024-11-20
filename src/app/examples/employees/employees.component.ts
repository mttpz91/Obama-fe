import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { PaginatedEmployees } from '@models/types/paginated-employees';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { Table, TableFilterEvent, TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { catchError, Observable, of, tap } from 'rxjs';
import { IFilterEvent } from '../../models/interfaces/interfaces';
import { EmployeeDataService } from './services/employee-data.service';
import { ODataExpressionBuilder } from './services/odata-espression-builder.service';
import { ODataOperatorRegistry } from './services/odata-operator-registry.service';
import { ODataQueryBuilderService } from './services/odata-query-builder.service';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    InputTextModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    ProgressBarModule,
    ButtonModule,
  ],
  providers: [
    EmployeeDataService,
    ODataOperatorRegistry,
    ODataExpressionBuilder,
    ODataQueryBuilderService
  ],
  templateUrl: './employees.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {
  private readonly employeeDataService = inject(EmployeeDataService);
  private readonly queryBuilder = inject(ODataQueryBuilderService);
  protected readonly isLoading = signal(true);
  protected readonly cols: Array<{ field: string; header: string }> = [
    { field: 'GivenName', header: 'Name'},
    { field: 'FamilyName', header: 'Surname'},
    { field: 'Mail', header: 'Mail'},
    { field: 'Role/Name', header: 'Role'},
  ];

  protected selectedColumns = this.cols;

  protected readonly employees$: Observable<PaginatedEmployees> = this.employeeDataService.employeesWithRole$.pipe(
    catchError(err => {
      console.error('An Error Occurred: ', err.error)
      return of({ value: [], count: 0});
    }),
    tap(() => this.isLoading.set(false))
  );

  clear(table: Table) {
    this.isLoading.set(true);
    table.clear();
    this.employeeDataService.updateFilters('');
  }

  filter(event: TableFilterEvent): void {
    const odataFilters = this.queryBuilder.buildQuery({filters: event.filters || {}} as IFilterEvent);

    this.isLoading.set(true);
    this.employeeDataService.updateFilters(odataFilters)
  }

  goToPage(event: TablePageEvent): void {
    this.isLoading.set(true);
    this.employeeDataService.updatePage(event.first)
  }
}
