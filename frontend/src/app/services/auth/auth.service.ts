import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sendUserData: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
