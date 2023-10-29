import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EmployeePageComponent,
    AddEmployeeComponent,
    EmployeesTableComponent
  ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ]
})
export class EmployeeModule { }
