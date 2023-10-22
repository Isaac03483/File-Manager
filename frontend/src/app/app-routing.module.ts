import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeModule} from "./modules/employee/employee.module";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
