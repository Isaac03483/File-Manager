import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AuthPageComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
