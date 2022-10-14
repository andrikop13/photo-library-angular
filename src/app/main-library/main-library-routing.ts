import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotosResolver } from './photos.resolver';

const routes: Routes = [
  {
    path: '',
    component: PhotosListComponent,
    resolve: {
      data: PhotosResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class MainLibRoutingModule {}
