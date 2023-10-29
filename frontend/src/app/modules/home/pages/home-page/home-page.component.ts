import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  username: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.sendUserData.subscribe({
      next: (response: any) => {
        this.username = response.username;
      }
    })
  }

}
