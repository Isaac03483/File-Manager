import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {

  authForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  )

  hide: boolean = false;
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
    }
  ]

  constructor(private router: Router, private authService: AuthService) {
  }

  sendData() {
    const { username, password } = this.authForm.value;

    this.authService.findUser(username, password).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.sendUserData.emit(response);
        this.router.navigate(['/', 'home']);
      }
    })
  }
}
