import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../../services/user/user.service";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['username', 'employeeName', 'type', 'options'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  updateForm!: FormGroup;
  hide: boolean = true;
  userToUpdate: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private matDialog: MatDialog, private formBuilder: FormBuilder) {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Realmente desea eliminar a: ${user.username}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if(result.isConfirmed) {
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
    })
  }

  findAll() {
    this.userService.findAll().subscribe({
      next: response => {
        // this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.data = response;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
