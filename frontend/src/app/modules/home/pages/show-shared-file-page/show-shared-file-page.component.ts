import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";
import {SharedFileService} from "../../../../services/document/shared-file.service";
import Swal from "sweetalert2";

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

  constructor(private cookieService: CookieService, private router: ActivatedRoute,
              private sharedFileService: SharedFileService) {
  }

  ngOnInit(): void {
    this.username = this.cookieService.get('username');

    this.router.queryParams
      .subscribe(params => {
        this.filename = params['filename'];
      })

    this.sharedFileService.findSharedFile(this.username, this.filename)
      .subscribe({
        next: response => {
          this.content = response.content;
          this.contentControl.setValue(this.content);
        }
      });
  }

  countRowsCols() {
    const content = this.contentControl.value;
    this.rows = content.split("\n").length;
    this.cols = content.split('\n')[this.rows - 1].length + 1;
  }

  updateFile() {
    const content = this.contentControl.value;

    this.sharedFileService.updateSharedFile(this.username, this.filename, content)
      .subscribe({
        next: response => {
          Swal.fire({
            title: "Actualizado!",
            text: "Archivo actualizado con éxito!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })
        },
        error: err => {
          Swal.fire({
            title: "Error!",
            text: "No se pudo actualizar el archivo",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
  }
}
