import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Photo } from '../shared/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotosStoreService {
  PICSUM_URL: string = 'https://picsum.photos/list';
  page: number = 0;
  limit: number = 12;

  private updatePhotos = new BehaviorSubject<Photo[]>([]);

  private photos$: Observable<Photo[]> = this.updatePhotos.asObservable();

  constructor(private http: HttpClient) {}

  getPhotos(page = this.page++, limit = this.limit) {
    const lower = page * limit;
    const upper = (page + 1) * limit;

    return this.photos$.pipe(map((photos) => photos.slice(lower, upper)));
  }

  loadPhotos() {
    return this.http
      .get<Photo[]>(this.PICSUM_URL)
      .pipe(tap((photos) => this.updatePhotos.next(photos)));
  }

  getClone() {
    const photos = this.updatePhotos.getValue();
    return photos.slice(0);
  }

  updateFavoriteStatus(photo: Photo, status: boolean) {
    const photos = this.getClone();
    const photoIndex = photos.findIndex((p) => p.id == photo.id);
    photos[photoIndex].favorite = status;

    return photos;
  }

  addToFavorite(photo: Photo) {
    this.updatePhotos.next(this.updateFavoriteStatus(photo, true));
  }

  removeFromFavorite(photo: Photo) {
    this.updatePhotos.next(this.updateFavoriteStatus(photo, false));
  }
}
