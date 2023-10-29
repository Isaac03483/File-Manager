import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'http://localhost:4000/api';
  updateTable: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) { }

  saveUser(username: string, password: string, employeeName: string, type: string) : Observable<any> {
    const body = {
      username,
      password,
      employeeName,
      type
    }

    return this.httpClient.post(`${this.URL}/users`, body);
  }

  deleteUser(username: string) : Observable<any> {

    return this.httpClient.delete(`${this.URL}/users/${username}`);
  }

  findAll() : Observable<any> {
    return this.httpClient.get(`${this.URL}/users`);
  }

  updateUser(username: string, employeeName: string, password: string, type: string) : Observable<any> {
    const body = {
      username,
      employeeName,
      password,
      type
    }

    console.log('body', body);

    return this.httpClient.put(`${this.URL}/users`, body);
  }
}
