import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Photo } from 'src/app/shared/models/photo';
import { PhotosStoreService } from 'src/app/store/photos-store.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit {
  favorites$!: Observable<Photo[]>;

  constructor(private photoStore: PhotosStoreService) {}

  ngOnInit(): void {
    this.favorites$ = this.photoStore
      .getState()
      .pipe(map((photos) => photos.filter((p) => p.favorite)));

    this.favorites$.subscribe((d) => console.log(d));
  }
}
