import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-show-user-info',
  templateUrl: './show-user-info.component.html',
  styleUrls: ['./show-user-info.component.css']
})
export class ShowUserInfoComponent implements OnInit {

  user: any;
  hide: boolean = true;
  infoForm: FormGroup;
  constructor(private cookieService: CookieService, private userService: UserService, private builder: FormBuilder,
              private matDialog: MatDialog) {
    this.infoForm = this.builder.group({
      username: [''],
      employeeName: [''],
      password: [''],
      type: [false]
    })
  }
  ngOnInit(): void {
    const username = this.cookieService.get('username');

    this.userService.findUserByUsername(username)
      .subscribe({
        next: response => {
          this.user = response;
          this.infoForm.get('username')?.setValue(this.user.username);
          this.infoForm.get('employeeName')?.setValue(this.user.employeeName);
          this.infoForm.get('password')?.setValue(this.user.password);
          this.infoForm.get('type')?.setValue(this.user.type === 'admin');
          this.infoForm.get('type')?.disable();
        }
      })
  }

  updateInfo() {
    let { employeeName, password } = this.infoForm.value;

    if(!employeeName) {
      employeeName = this.user.employeeName;
    }

    if(!password) {
      password = this.user.password;
    }

    this.userService.updateUser(this.user.username, employeeName, password, this.user.type)
      .subscribe({
        next: response => {
          Swal.fire({
            title: "Actualizado!",
            text: "El usuario se actualizó con éxito",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })
          this.matDialog.closeAll();
        },
        error: err => {
          Swal.fire({
            title: "Error!",
            text: "No se pudo actualizar al usuario",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          })
        }
      });

  }
}
