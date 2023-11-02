import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {DirectoryService} from "../../../../services/document/directory.service";
import {FileService} from "../../../../services/document/file.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-show-shared-documents-page',
  templateUrl: './show-shared-documents-page.component.html',
  styleUrls: ['./show-shared-documents-page.component.css']
})
export class ShowSharedDocumentsPageComponent implements OnInit {

  username: string = '';
  directories: any[] = [];
  files: any[] = [];
  currentPath: string = 'shared';
  previousPath: string = '';

  constructor(private cookieService: CookieService, private directoryService: DirectoryService,
              private fileService: FileService) {

  }
  ngOnInit(): void {
    this.username = this.cookieService.get('username');

    this.getDirectories();
    this.getFiles();
  }

  getDirectories() {
    this.directoryService.getDirectoriesByUsername(this.username, this.currentPath)
      .subscribe({
        next: response => {
          this.directories = response;
        }
      });
  }

  getFiles() {
    this.fileService.getFilesByUsername(this.username, this.currentPath)
      .subscribe({
        next: response => {
          this.files = response;
        }
      })
  }

  goTo(directory: any) {

    console.log(directory);

    this.previousPath = directory.path;
    this.currentPath = `${directory.path}/${directory.name}`;

    this.getDirectories();
    this.getFiles();
  }

  goBack() {
    this.currentPath = this.previousPath;
    this.previousPath = this.previousPath === 'shared' ? '' : this.previousPath.substring(0, this.previousPath.lastIndexOf("/"));

    this.getDirectories();
    this.getFiles();
  }
}
