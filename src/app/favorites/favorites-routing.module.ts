import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';

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
