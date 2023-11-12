import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Directory} from "../../../../core/models/Model";
import {CookieService} from "ngx-cookie-service";
import {DirectoryService} from "../../../../services/document/directory.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-copy-directory-dialog',
  templateUrl: './copy-directory-dialog.component.html',
  styleUrls: ['./copy-directory-dialog.component.css']
})
export class CopyDirectoryDialogComponent implements OnInit {

  directories: any[] = [];
  username: string = '';
  name: string = '';
  currentPath: string = 'root';
  previousPath: string = '';


  constructor(@Inject(MAT_DIALOG_DATA) public data: Directory, private cookieService: CookieService,
              private directoryService: DirectoryService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.name = this.data.name;

    this.getDirectories();
  }

  getDirectories() {
    if(this.currentPath === this.data.path) {
      this.directoryService.findAllWithout(this.username, this.name, this.currentPath)
        .subscribe({
          next: response => {
            this.directories = response;
          }
        })
    } else {
      this.directoryService.getDirectoriesByUsername(this.username, this.currentPath)
        .subscribe({
          next: response => {
            this.directories = response;
          }
        })
    }
  }

  goBack() {
    this.currentPath = this.previousPath;
    this.previousPath = this.previousPath === 'root' ? '' : this.previousPath.substring(0, this.previousPath.lastIndexOf("/"));

    this.getDirectories();
  }

  goTo(directory: any) {
    this.previousPath = directory.path;
    this.currentPath = `${directory.path}/${directory.name}`;

    this.getDirectories();
  }

  copyDirectory() {
    this.directoryService.copyDirectory(this.username, this.data.name, this.data.path, this.currentPath)
      .subscribe({
        next: res => {
          Swal.fire({
            title: "Directorio copiado!",
            text: "Se ha copiado el directorio exitosamente!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })
          this.matDialog.closeAll();
        },
        error: err => {
          Swal.fire({
            title: "Error!",
            text: err.error,
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
  }

  hasDuplicate() : boolean {
    const duplicate = this.directories.filter(directory => directory.name === this.data.name);
    return duplicate.length > 0;
  }
}
