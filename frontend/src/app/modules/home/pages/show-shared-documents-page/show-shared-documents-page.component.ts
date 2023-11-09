import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {DirectoryService} from "../../../../services/document/directory.service";
import {FileService} from "../../../../services/document/file.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {SharedFileService} from "../../../../services/document/shared-file.service";
import {Router} from "@angular/router";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-show-shared-documents-page',
  templateUrl: './show-shared-documents-page.component.html',
  styleUrls: ['./show-shared-documents-page.component.css']
})
export class ShowSharedDocumentsPageComponent implements OnInit {

  username: string = '';
  files: any[] = [];
  matBottomSheetRef!: MatBottomSheetRef;

  constructor(private cookieService: CookieService, private router: Router,
              private sharedFileService: SharedFileService, private matBottomSheet: MatBottomSheet) {

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

  showTemplate($event: MouseEvent, template: TemplateRef<any>, data: any) {
    $event.preventDefault();
    this.matBottomSheetRef = this.matBottomSheet.open(template, {data});
  }

  deleteFile(data: any) {
    console.log(data);

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará este archivo permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if(result.isConfirmed) {
        this.sharedFileService.deleteSharedFile(this.username, data.name)
          .subscribe({
            next: response => {
              Swal.fire({
                title: "Eliminado!",
                text: "El archivo se eliminó correctamente!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
              })

              this.getSharedFiles();
            }
          });
      }
    });



    if(this.matBottomSheetRef) {
      this.matBottomSheetRef.dismiss();
    }
  }
}
