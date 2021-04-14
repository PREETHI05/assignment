import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeesListComponent } from './employee/employees-list/employees-list.component';

const appRoutes: Routes = [
 // { path: '', redirectTo: 'employees-list', pathMatch: 'full'},
  { path: '', redirectTo: 'employees-list', pathMatch: 'full' },
  { path: 'employees-list', component: EmployeesListComponent },  
  { path: 'employee-add', component: EmployeeAddComponent }
  //{ path: 'employee-add', redirectTo: 'employees-list', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
