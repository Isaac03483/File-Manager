import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ShowDocumentsPageComponent } from './pages/show-documents-page/show-documents-page.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import { ShowSharedDocumentsPageComponent } from './pages/show-shared-documents-page/show-shared-documents-page.component';
import { ShowFilePageComponent } from './pages/show-file-page/show-file-page.component';
import { ShowSharedFilePageComponent } from './pages/show-shared-file-page/show-shared-file-page.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {MatBottomSheet, MatBottomSheetModule} from "@angular/material/bottom-sheet";


@NgModule({
  declarations: [

    HomePageComponent,
     ShowDocumentsPageComponent,
     ShowSharedDocumentsPageComponent,
     ShowFilePageComponent,
     ShowSharedFilePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule,
    MatListModule,
    MatLineModule,
    MatBottomSheetModule
  ]
})
export class HomeModule { }
