import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesListComponent } from './favorites/favorites-list/favorites-list.component';
import { PhotoInfoComponent } from './favorites/photo-info/photo-info.component';
import { PhotosListComponent } from './main-library/photos-list/photos-list.component';
import { PhotosResolver } from './main-library/photos.resolver';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosListComponent,
    resolve: {
      data: PhotosResolver,
    },
  },
  {
    path: 'favorites',
    component: FavoritesListComponent,
  },
  {
    path: 'photos/:id',
    component: PhotoInfoComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
