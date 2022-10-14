import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PhotosListComponent } from './photos-list/photos-list.component';

@NgModule({
  declarations: [PhotosListComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [MatButtonModule, MatToolbarModule, PhotosListComponent],
})
export class SharedModuleModule {}
