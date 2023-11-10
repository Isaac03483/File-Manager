import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {DirectoryService} from "../../../../services/document/directory.service";
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  showTrashButton: boolean = false;

  constructor(private cookieService: CookieService) {
    const type: string = this.cookieService.get('type');

    if(type === 'admin') {
      this.showTrashButton = true;
    }
  }

  ngOnInit(): void {
  }

}
