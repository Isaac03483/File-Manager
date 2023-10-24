import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {

  users: any = [
    {
      username: 'admin123',
      type: 'admin',
      password: '1234'
    },
    {
      username: 'user123',
      type: 'user',
      password: '1234'
    },
    {
      username: 'admin123',
      type: 'admin',
      password: '1234'
    },
    {
      username: 'user123',
      type: 'user',
      password: '1234'
    },
    {
      username: 'admin123',
      type: 'admin',
      password: '1234'
    },
    {
      username: 'user123',
      type: 'user',
      password: '1234'
    },
    {
      username: 'admin123',
      type: 'admin',
      password: '1234'
    },
    {
      username: 'user123',
      type: 'user',
      password: '1234'
    }
  ]

  displayedColumns: string[] = ['username', 'type', 'options'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.users);

  constructor() {
  }
}
