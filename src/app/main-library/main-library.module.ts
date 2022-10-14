import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { MainLibRoutingModule } from './main-library-routing';

@NgModule({
  declarations: [PhotosListComponent],
  imports: [CommonModule, MainLibRoutingModule],
})
export class MainLibraryModule {}
