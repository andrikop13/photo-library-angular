import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FavoritesListComponent],
  imports: [CommonModule, FavoritesRoutingModule, SharedModule],
})
export class FavoritesModule {}