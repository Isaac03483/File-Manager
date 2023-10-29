import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {

  hide: boolean = true;
  updateForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
              private userService: UserService, private matDialog: MatDialog) {
      this.updateForm = this.formBuilder.group(
          {
              employeeName: [data.employeeName],
              password: [data.password],
              isAdmin: [data.type === 'admin']
          }
      )
  }

  updateUser() {
    let { employeeName, password, isAdmin } = this.updateForm.value;
    let type: string = 'user';

    console.log('before',employeeName, password, type);

    if(!employeeName) {
      employeeName = this.data.employeeName;
    }

    if(!password || password.length < 8) {
      password = this.data.password;
    }

    if(isAdmin) {
      type = 'admin';
    }

    console.log('after', employeeName, password, type);

    this.userService.updateUser(this.data?.username, employeeName, password, type).subscribe({
      next: response => {
        Swal.fire({
          title: "Actualizado",
          text: "Usuario actualizado exitosamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2000
        })

        this.userService.updateTable.emit();
        this.matDialog.closeAll();
      }
    })

  }
}
