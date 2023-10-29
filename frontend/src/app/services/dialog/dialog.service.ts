import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormDialogComponent} from "../../shared/components/form-dialog/form-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openUpdateEmployeeDialog(data: any) {
    return this.matDialog.open(FormDialogComponent, { data });
  }
}
