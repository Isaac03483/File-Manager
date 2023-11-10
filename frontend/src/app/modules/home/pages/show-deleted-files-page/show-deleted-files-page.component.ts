import {Component, OnInit, TemplateRef} from '@angular/core';
import {DeletedFileService} from "../../../../services/document/deleted-file.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-show-deleted-files-page',
  templateUrl: './show-deleted-files-page.component.html',
  styleUrls: ['./show-deleted-files-page.component.css']
})
export class ShowDeletedFilesPageComponent implements OnInit {
  files: any[] = [];

  constructor(private deletedFileService: DeletedFileService, private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.deletedFileService.findAll()
      .subscribe({
        next: response => {
          this.files = response;
        }
      })
  }

  openDialog(templateRef: TemplateRef<any>, data: any) {
    this.matDialog.open(templateRef, {data})
  }
}
