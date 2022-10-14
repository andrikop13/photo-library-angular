import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './@theme/components/header/header.component';
import { MainLibraryModule } from './main-library/main-library.module';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLibraryModule,
    SharedModuleModule,
    FavoritesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
