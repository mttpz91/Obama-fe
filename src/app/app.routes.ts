import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () =>
      import('./examples/employees/employees.component').then(
        (c) => c.EmployeesComponent
      ),
  },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];
