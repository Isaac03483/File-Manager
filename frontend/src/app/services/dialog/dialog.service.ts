import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UpdateDialogComponent} from "../../modules/employee/components/update-dialog/update-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openUpdateEmployeeDialog(data: any) {
    return this.matDialog.open(UpdateDialogComponent, { data });
  }
}
