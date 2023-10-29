import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  hide: boolean = false;
  userForm: FormGroup = new FormGroup<any>(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      employeeName: new FormControl('', Validators.required),
      isAdmin: new FormControl(false)
    }
  )

  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective

  constructor(private userService: UserService) {
  }

  saveUser() {

    const {username, password, employeeName, isAdmin} = this.userForm.value;
    let type = 'user';

    if(isAdmin) {
      type = 'admin';
    }

    this.userService.saveUser(username, password, employeeName, type).subscribe({
      next: (response) => {
        Swal.fire({
          title: "Guardado!",
          text: "Usuario guardado con éxito",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })

        this.formDir.resetForm();
        this.userService.updateTable.emit();
      },
      error: (error) => {
        Swal.fire({
          title: "Error!",
          text: "No se pudo guardar al usuario",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
}
