import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../../../services/document/file.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-show-file-page',
  templateUrl: './show-file-page.component.html',
  styleUrls: ['./show-file-page.component.css']
})
export class ShowFilePageComponent implements OnInit {

  rows: number = 1;
  cols: number = 1;
  fileForm: FormGroup;
  username: string = '';
  path: string = 'root';
  filename: string = '';
  content: string = '';

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private fileService: FileService,
              private cookieService: CookieService) {

    this.fileForm = this.formBuilder.group({
      name: [''],
      content: ['']
    })
  }

  ngOnInit(): void {
    this.username = this.cookieService.get('username');

    this.router.queryParams
      .subscribe(params => {
        this.path = params['path'];
        this.filename = params['filename'];
      })

    if(this.filename !== '') {
      this.fileService.getFileByName(this.username, this.path, this.filename)
        .subscribe({
          next: response => {
            this.filename = response.name;
            this.content = response.content;

            this.fileForm.get('name')?.setValue(this.filename);
            this.fileForm.get('content')?.setValue(this.content);
          }
        })
    }


  }

  countRowsCols() {
    const { content } = this.fileForm.value;
    this.rows = content.split("\n").length;
    this.cols = content.split('\n')[this.rows - 1].length + 1;
  }

  save() {
    const { name, content } = this.fileForm.value;

    if(!this.hasExtension(name)) {
      Swal.fire({
        title: "Error!",
        text: "El nombre debe poseer extensión: txt o html",
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }

    if(this.filename !== '') {
      this.updateFile(name, content);
      return;
    }

    this.saveFile(name, content);
  }

  private saveFile(name: any, content: any) {
    this.fileService.saveFile(this.username, this.path, name, content)
      .subscribe({
        next: response => {
          Swal.fire({
            title: "Guardado!",
            text: "Archivo Guardado con éxito!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })
        },
        error: err => {
          Swal.fire({
            title: "Error",
            text: "No se pudo guardar el documento",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
  }

  private updateFile(name: any, content: any) {
    console.log('content', content)
    this.fileService.updateFile(this.username, this.filename,this.path, name, content)
      .subscribe({
        next: response => {
          Swal.fire({
            title: "Guardado!",
            text: "Archivo Guardado con éxito!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })
        },
        error: err => {
          Swal.fire({
            title: "Error",
            text: "No se pudo guardar el documento",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
  }

  hasExtension(filename: string) : boolean {
    if(!filename.includes(".") || filename.split(".").length < 2) {
      return false;
    }

    const extension = filename.split(".")[1];

    return extension === "txt" || extension === "html";
  }


}
