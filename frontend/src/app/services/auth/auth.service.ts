import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = 'http://localhost:4000/api'

  sendUserData: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  findUser(username: string, password: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/auth/${username}/${password}`);
  }
}
