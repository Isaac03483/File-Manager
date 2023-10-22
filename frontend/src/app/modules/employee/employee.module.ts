import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    EmployeePageComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class EmployeeModule { }
