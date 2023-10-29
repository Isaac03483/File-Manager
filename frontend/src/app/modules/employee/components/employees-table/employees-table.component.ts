import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../../services/user/user.service";
import Swal from "sweetalert2";
import {DialogService} from "../../../../services/dialog/dialog.service";

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit{

  displayedColumns: string[] = ['username', 'employeeName', 'type', 'options'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


  constructor(private userService: UserService, private dialogService: DialogService) {
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

  updateUser(user: any) {
    console.log(user);
    this.dialogService.openUpdateEmployeeDialog(user);
  }
}
