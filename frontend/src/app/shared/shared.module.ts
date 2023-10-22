import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatMenuModule} from "@angular/material/menu";



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent
  ],
  exports: [
    NavBarComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatMenuModule
  ]
})
export class SharedModule { }
