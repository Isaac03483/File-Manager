import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {DirectoryService} from "../../../../services/document/directory.service";
import {FileService} from "../../../../services/document/file.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-show-documents-page',
  templateUrl: './show-documents-page.component.html',
  styleUrls: ['./show-documents-page.component.css']
})
export class ShowDocumentsPageComponent implements OnInit {

  username: string = '';
  directories: any[] = [];
  files: any[] = [];
  currentPath: string = 'root';
  previousPath: string = '';
  createDirectoryForm!: FormGroup;
  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;


  constructor(private cookieService: CookieService, private directoryService: DirectoryService,
              private fileService: FileService, private matDialog: MatDialog, private builder: FormBuilder) {

    this.createDirectoryForm = this.builder.group({
      directoryName: ['', Validators.required]
    })
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

  createNewDirectory(templateRef: TemplateRef<any>) {
    this.matDialog.open(templateRef);
  }

  createDirectory() {
    const { directoryName } = this.createDirectoryForm.value;

    this.directoryService.createDirectory(this.username, this.currentPath, directoryName)
      .subscribe({
        next: response => {
          Swal.fire({
            title: "Directorio creado!",
            text: "El directorio se creó exitosamente!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })

          this.getDirectories();
          this.formDir.resetForm(this.createDirectoryForm);
          this.matDialog.closeAll();
        },

        error: err => {
          Swal.fire({
            title: "Error!",
            text: "No se pudo crear el directorio",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          })
        }
      });


  }

  goBack() {
    this.currentPath = this.previousPath;
    this.previousPath = this.previousPath === 'root' ? '' : this.previousPath.substring(0, this.previousPath.lastIndexOf("/"));

    this.getDirectories();
    this.getFiles();
  }
}
