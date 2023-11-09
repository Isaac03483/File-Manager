import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedFileService {

  private readonly URL = 'http://localhost:4000/api'

  constructor(private httpClient: HttpClient) { }

  getUserSharedFiles(username: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/shared-files/${username}`);
  }

  sharedFileTo(usernameOrigin: string, usernameDestiny: string, name: string, content: string) : Observable<any> {
    const body = {
      usernameOrigin,
      usernameDestiny,
      name,
      content
    }
    return this.httpClient.post(`${this.URL}/shared-files`, body);
  }

  findSharedFile(username: string, name: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/shared-files/find/${username}/${name}`);
  }

  updateSharedFile(username: string, name: string, content: string) : Observable<any> {
    const body = {
      username,
      name,
      content
    }
    return this.httpClient.put(`${this.URL}/shared-files`, body);
  }

  deleteSharedFile(username: string, name: string) : Observable<any> {
    return this.httpClient.delete(`${this.URL}/shared-files/${username}/${name}`);
  }
}
