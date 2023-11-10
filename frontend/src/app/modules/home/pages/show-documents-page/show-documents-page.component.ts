import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {DirectoryService} from "../../../../services/document/directory.service";
import {FileService} from "../../../../services/document/file.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {Router} from "@angular/router";
import {SharedFileService} from "../../../../services/document/shared-file.service";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MoveDirectoryDialogComponent} from "../../components/move-directory-dialog/move-directory-dialog.component";
import {MoveFileDialogComponent} from "../../components/move-file-dialog/move-file-dialog.component";

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
  createDirectoryControl: FormControl = new FormControl('', Validators.required);
  shareFileControl: FormControl = new FormControl('', Validators.required);
  matBottomSheetRef!: MatBottomSheetRef;

  directoriesMove: any[] = [];
  currentMove: string = 'root';
  previousMove: string = '';

  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;


  constructor(private cookieService: CookieService, private directoryService: DirectoryService, private router: Router,
              private fileService: FileService, private matDialog: MatDialog, private shareFileService: SharedFileService,
              private matBottomSheet: MatBottomSheet) {

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
    this.matDialog.open(templateRef).afterClosed()
      .subscribe({
        next: val => {
          this.createDirectoryControl.reset();
        }
      });
  }

  createDirectory() {
    const directoryName = this.createDirectoryControl.value;

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
          this.createDirectoryControl.reset();
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

  showFile(name?: string) {
    this.router.navigate(['/', 'home', 'show-file'], name ?
      {queryParams: {filename: name, path: this.currentPath}} :
      {queryParams: {filename: '', path: this.currentPath}}
    );
  }

  showSharedTemplate(template: TemplateRef<any>, file: any) {
    this.matDialog.open(template, {data: file}).afterClosed()
      .subscribe({
        next: val => {
          this.shareFileControl.reset();
          if (this.matBottomSheetRef) {
            this.matBottomSheetRef.dismiss();
          }
        }
      });
  }

  shareFile(data: any) {
    const usernameDestiny = this.shareFileControl.value;
    this.shareFileService.sharedFileTo(this.username, usernameDestiny, data.name, data.content)
      .subscribe({
        next: response => {
          Swal.fire({
            title: "Compartido!",
            text: `Se compartió el archivo con: ${usernameDestiny}`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
          this.matDialog.closeAll();
        },
        error: err => {
          Swal.fire({
            title: "Error!",
            text: `No se pudo compartir el archivo`,
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
  }

  showOptionsTemplate($event: MouseEvent, directoryOptionsTemplate: TemplateRef<any>, data: any) {
    $event.preventDefault();
    this.matBottomSheetRef = this.matBottomSheet.open(directoryOptionsTemplate, {data});
  }

  deleteFile(data: any) {
    console.log(data);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se enviará el archivo a la papelera.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        this.fileService.deleteFile(this.username, data.path, data.name)
          .subscribe({
            next: response => {
              Swal.fire({
                title: "Eliminado!",
                text: "El archivo se eliminó correctamente!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
              })

              this.getFiles();
            }
          });
      }
    });

    if (this.matBottomSheetRef) {
      this.matBottomSheetRef.dismiss();
    }
  }

  openMoveDirectoryDialog(data: any) {
    this.matDialog.open(MoveDirectoryDialogComponent, {data})
      .afterClosed().subscribe({
      next: val => {
        if (this.matBottomSheetRef) {
          this.matBottomSheetRef.dismiss();
        }

        this.getDirectories();
        this.getFiles();
      }
    });
  }

  openMoveFileDialog(data: any) {
    this.matDialog.open(MoveFileDialogComponent, { data })
      .afterClosed().subscribe({
      next: val => {
        if (this.matBottomSheetRef) {
          this.matBottomSheetRef.dismiss();
        }
        this.getFiles();
      }
    })
  }
}
