import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PhotoInfoComponent } from './photo-info/photo-info.component';

@NgModule({
  declarations: [FavoritesListComponent, PhotoInfoComponent],
  imports: [CommonModule, FavoritesRoutingModule, SharedModule],
})
export class FavoritesModule {}
