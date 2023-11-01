import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  private readonly URL = 'http://localhost:4000/api'


  constructor(private httpClient: HttpClient) { }

  getDirectoriesByUsername(username: string, path: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/directories/${username}/${path}`);
  }
}