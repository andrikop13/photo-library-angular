import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PhotosListComponent } from '../main-library/photos-list/photos-list.component';
import { InfiniteScrollingComponent } from './infinite-scrolling/infinite-scrolling.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnimateListComponent } from './animate-list/animate-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    InfiniteScrollingComponent,
    SingleItemComponent,
    AnimateListComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    InfiniteScrollingComponent,
    SingleItemComponent,
    AnimateListComponent,
    NotFoundComponent,
  ],
})
export class SharedModule {}
