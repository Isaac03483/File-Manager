import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly URL = 'http://localhost:4000/api'

  constructor(private httpClient: HttpClient) { }

  getFilesByUsername(username: string, path: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/files/${username}?path=${path}`);
  }
}
