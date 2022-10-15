import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { Photo } from '../shared/models/photo';
import { DbStoreService } from './db-store.service';

@Injectable({
  providedIn: 'root',
})
export class PhotosStoreService {
  private updatePhotos = new BehaviorSubject<Photo[]>([]);
  private saveState = new BehaviorSubject<Photo[]>([]);
  private state: Observable<Photo[]> = this.saveState as Observable<Photo[]>;

  private page: number = 0;
  private limit: number = 10;
  totalPhotos: number = 0;

  constructor(private dbStore: DbStoreService) {
    this.totalPhotos = dbStore.totalPhotos;
  }

  loadNext(page = this.page++, limit = this.limit) {
    const lower = page * limit;
    let upper = (page + 1) * limit;

    const totalElements = this.dbStore.totalPhotos;
    if (upper > totalElements - 1) upper = totalElements;

    return this.dbStore.getRange(lower, upper).pipe(
      tap((d) => {
        const currentPhotos = this.getClone();
        this.updatePhotos.next([...currentPhotos, ...d]);
        this.saveState.next([...currentPhotos, ...d]);
      })
    );
  }

  getClone() {
    const photos = this.updatePhotos.getValue();
    return photos.slice(0);
  }

  getState() {
    return this.state;
  }

  emptyPhotos() {
    this.updatePhotos.next([]);
    this.page = 0;
  }

  updateFavoriteStatus(photo: Photo, status: boolean) {
    const photos = this.getClone();
    const photoIndex = photos.findIndex((p) => p.id == photo.id);
    photos[photoIndex].favorite = status;

    return photos;
  }

  addToFavorite(photo: Photo) {
    const updated = this.updateFavoriteStatus(photo, true);
    this.updatePhotos.next(updated);
    this.saveState.next(updated);
  }

  removeFromFavorite(photo: Photo) {
    const updated = this.updateFavoriteStatus(photo, false);
    this.updatePhotos.next(updated);
    this.saveState.next(updated);
  }

  loadPhotos() {
    return this.dbStore.load();
  }
}
