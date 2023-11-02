import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: any;

  showButtons: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {

    this.authService.sendUserData.subscribe({
      next: (data: any) => {
        this.user = data;
      }
    });

    this.router.events.subscribe({
      next: value => {
        if(value instanceof NavigationEnd) {
          this.showButtons = !value.url.includes('auth');
        }
      }
    })
  }

  goTo(goTo: string) {
    this.router.navigate(['/', goTo]);
  }

  logout() {
    this.user = undefined;
    this.router.navigate(['/', 'auth']);
  }
}
