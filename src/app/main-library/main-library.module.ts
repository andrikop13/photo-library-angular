import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { MainLibRoutingModule } from './main-library-routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PhotosListComponent],
  imports: [CommonModule, MainLibRoutingModule, SharedModule],
})
export class MainLibraryModule {}
