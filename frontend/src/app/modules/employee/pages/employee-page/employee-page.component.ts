import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent {

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
