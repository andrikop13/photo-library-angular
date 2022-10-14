import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'favorites',
    loadChildren: () =>
      import('./favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./main-library/main-library.module').then(
        (m) => m.MainLibraryModule
      ),
  },

  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
