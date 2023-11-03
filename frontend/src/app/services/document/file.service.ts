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

  getFileByName(username: string, path: string, name: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/files/find/${username}/${name}?path=${path}`);
  }

  saveFile(username: string, path: string, name: string, content: string) : Observable<any> {
    const body = {
      username,
      path,
      name,
      content
    }
    return this.httpClient.post(`${this.URL}/files`, body);
  }

  updateFile(username: string, pastName: string, path: string, name: string, content: string) : Observable<any> {
    const body = {
      username,
      pastName,
      path,
      name,
      content
    }
    return this.httpClient.put(`${this.URL}/files`, body);
  }
}
