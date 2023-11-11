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
    return this.httpClient.get(`${this.URL}/directories/${username}?path=${path}`);
  }

  createDirectory(username: string, path: string, name: string) : Observable<any> {
    const body = {
      username,
      path,
      name
    }

    return this.httpClient.post(`${this.URL}/directories`, body);
  }

  findAllWithout(username: string, name: string, path: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/directories/move/${username}/${name}?path=${path}`)
  }

  moveDirectory(username: string, name: string, oldPath: string, newPath: string) : Observable<any> {
    const body = {
      username,
      name,
      oldPath,
      newPath
    }

    return this.httpClient.put(`${this.URL}/directories`, body);
  }

  deleteDirectory(username: string, name: string, path: string) : Observable<any> {
    return this.httpClient.delete(`${this.URL}/directories/${username}/${name}?path=${path}`);
  }

  copyDirectory(username: string, name: string, path: string, newPath: string) : Observable<any> {
    const body = {
      username,
      name,
      path,
      newPath
    }
    return this.httpClient.post(`${this.URL}/directories/copy`, body);
  }
}
