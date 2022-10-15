import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './@theme/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FavoritesListComponent } from './favorites/favorites-list/favorites-list.component';
import { PhotosListComponent } from './main-library/photos-list/photos-list.component';
import { PhotoInfoComponent } from './favorites/photo-info/photo-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FavoritesListComponent,
    PhotosListComponent,
    PhotoInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
