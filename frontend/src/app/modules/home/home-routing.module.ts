import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ShowDocumentsPageComponent} from "./pages/show-documents-page/show-documents-page.component";
import {
  ShowSharedDocumentsPageComponent
} from "./pages/show-shared-documents-page/show-shared-documents-page.component";
import {ShowFilePageComponent} from "./pages/show-file-page/show-file-page.component";
import {ShowSharedFilePageComponent} from "./pages/show-shared-file-page/show-shared-file-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'my-documents',
        component: ShowDocumentsPageComponent
      },
      {
        path: 'show-file',
        component: ShowFilePageComponent
      },
      {
        path: 'show-shared-file',
        component: ShowSharedFilePageComponent
      },
      {
        path: 'shared-documents',
        component: ShowSharedDocumentsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
