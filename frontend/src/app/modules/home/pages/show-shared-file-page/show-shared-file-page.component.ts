import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-shared-file-page',
  templateUrl: './show-shared-file-page.component.html',
  styleUrls: ['./show-shared-file-page.component.css']
})
export class ShowSharedFilePageComponent implements OnInit {

  username: string = '';
  rows: number = 1;
  cols: number = 1;
  filename: string = '';
  content: string = '';
  contentControl: FormControl = new FormControl('');

  constructor(private cookieService: CookieService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.username = this.cookieService.get('username');

    this.router.queryParams
      .subscribe(params => {
        this.filename = params['filename'];
      })

    this.contentControl.setValue(this.filename);
  }

  countRowsCols() {
    const { content } = this.contentControl.value;
    this.rows = content.split("\n").length;
    this.cols = content.split('\n')[this.rows - 1].length + 1;
  }
}
