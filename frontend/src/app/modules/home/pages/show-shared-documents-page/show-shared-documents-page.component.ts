import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {DirectoryService} from "../../../../services/document/directory.service";
import {FileService} from "../../../../services/document/file.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {SharedFileService} from "../../../../services/document/shared-file.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-shared-documents-page',
  templateUrl: './show-shared-documents-page.component.html',
  styleUrls: ['./show-shared-documents-page.component.css']
})
export class ShowSharedDocumentsPageComponent implements OnInit {

  username: string = '';
  files: any[] = [];

  constructor(private cookieService: CookieService, private router: Router,
              private sharedFileService: SharedFileService) {

  }
  ngOnInit(): void {
    this.username = this.cookieService.get('username');

    this.getSharedFiles();
  }

  getSharedFiles() {
    this.sharedFileService.getUserSharedFiles(this.username)
      .subscribe({
        next: response => {
          this.files = response;
        }
      })
  }

  showFile(name?: string) {
    this.router.navigate(['/','home','show-shared-file'],
      {queryParams: {filename: name}}
    );
  }
}
