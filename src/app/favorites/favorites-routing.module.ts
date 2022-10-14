import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { PhotoInfoComponent } from './photo-info/photo-info.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesListComponent,
  },
  {
    path: 'photos/:id',
    component: PhotoInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
