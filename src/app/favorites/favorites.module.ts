import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { FavoritesRoutingModule } from './favorites-routing.module';

@NgModule({
  declarations: [FavoritesListComponent],
  imports: [CommonModule, FavoritesRoutingModule],
})
export class FavoritesModule {}
