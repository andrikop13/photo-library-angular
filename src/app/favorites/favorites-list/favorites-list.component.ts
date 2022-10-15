import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Photo } from 'src/app/shared/models/photo';
import { PhotosStoreService } from 'src/app/store/photos-store.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
})
export class FavoritesListComponent implements OnInit {
  favorites$: Observable<Photo[]> = of([]);

  trackByFn(_: any, { id }: Photo): number {
    return id;
  }
  constructor(private photoStore: PhotosStoreService, private router: Router) {}

  ngOnInit(): void {
    this.favorites$ = this.photoStore.getState();
  }

  openPhoto(photo: Photo) {
    this.router.navigate([`/photos/${photo.id}`]);
  }

  ngOnDestroy(): void {}
}
