import {Component, OnInit, TemplateRef} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../../services/user/user.service";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit{

  displayedColumns: string[] = ['username', 'employeeName', 'type', 'options'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  updateForm!: FormGroup;
  hide: boolean = true;
  userToUpdate: any;

  constructor(private userService: UserService, private matDialog: MatDialog, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.findAll();
    this.userService.updateTable.subscribe({
      next: (response: any) => {
        this.findAll();
      }
    });
  }

  delete(user: any) {
    console.log(user);
    this.userService.deleteUser(user.username).subscribe({
      next: response => {
        Swal.fire({
          title: "Eliminado!",
          icon: "success",
          text: "Usuario eliminado con éxito",
          showConfirmButton: false,
          timer: 2000
        })
        this.findAll();
      }
    })
  }

  findAll() {
    this.userService.findAll().subscribe({
      next: response => {
        console.log(response);
        this.dataSource = response;
      }
    })
  }

  updateUser(user: any, templateRef: TemplateRef<any>) {
    console.log(user);
    // this.dialogService.openUpdateEmployeeDialog(user);
    this.userToUpdate = user;
    this.updateForm = this.formBuilder.group(
      {
        employeeName: [user.employeeName],
        password: [user.password],
        isAdmin: [user.type === 'admin']
      }
    )
    this.matDialog.open(templateRef, {data: user})
  }

  updateUserForm(user: any) {
    let { employeeName, password, isAdmin } = this.updateForm.value;
    let type: string = 'user';

    console.log('before',employeeName, password, type);

    if(!employeeName) {
      employeeName = user.employeeName;
    }

    if(!password || password.length < 8) {
      password = user.password;
    }

    if(isAdmin) {
      type = 'admin';
    }

    console.log('after', employeeName, password, type);

    this.userService.updateUser(user.username, employeeName, password, type).subscribe({
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
