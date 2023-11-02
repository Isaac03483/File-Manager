import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {DirectoryService} from "../../../../services/document/directory.service";
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
