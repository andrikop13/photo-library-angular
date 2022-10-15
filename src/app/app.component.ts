import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from './@theme/animations';
import { Photo } from './shared/models/photo';
import { PhotosStoreService } from './store/photos-store.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main role="main" [@fadeAnimation]>
      <div class="main-body">
        <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </main>
  `,
  styles: [
    `
      .main-body {
        width: 90%;
        margin: 2% 5%;
        display: flex;
        justify-content: center;
        max-height: 75vh;
        overflow-y: scroll;
      }
    `,
  ],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'photo-library-angular';

  constructor(private photoStore: PhotosStoreService) {}

  ngOnInit(): void {
    this.checkForStorage();
  }

  checkForStorage() {
    const favorites = JSON.parse(sessionStorage.getItem('favorites') as string);
    if (favorites.length) this.photoStore.setState(favorites as Photo[]);
  }
}
