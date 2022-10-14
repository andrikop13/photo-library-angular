import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePhotoComponent } from '../single-photo/single-photo.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesListComponent,
  },
  {
    path: 'photos/:id',
    component: SinglePhotoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
