import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { CONFIG } from '../../config';
import { Photo } from '../shared/models/photo';

@Injectable({
  providedIn: 'root',
})
export class DbStoreService {
  private limit: number = CONFIG.photosPerPage;
  private fillDB = new BehaviorSubject<Photo[]>([]);
  private EmulatePhotosDB$: Observable<Photo[]> = this.fillDB.asObservable();

  totalPhotos: number = CONFIG.filterPhotosNum;

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<Photo[]>(CONFIG.getListOfPhotos).pipe(
      map((photos) =>
        photos.map((p) => {
          return {
            author: p.author,
            id: p.id,
          };
        })
      ),
      tap((photos: Photo[]) => {
        const photosLimit = photos.slice(0, CONFIG.filterPhotosNum + 1);
        this.fillDB.next(photosLimit);
        this.totalPhotos = CONFIG.filterPhotosNum;
      }),
      catchError(() => of([]))
    );
  }

  getRange(page: number, limit = this.limit) {
    const lower = page * limit;
    let upper = (page + 1) * limit;
    if (upper > this.totalPhotos - 1) upper = this.totalPhotos;

    return this.EmulatePhotosDB$.pipe(
      map((photos) => photos.slice(lower, upper)),
      delay(this.randomResTime(200, 300)) // Emulate real time API delay
    );
  }

  randomResTime(min: number, max: number): number {
    return Math.random() * (min - max) + min;
  }

  isEmpty() {
    return !this.fillDB.getValue().slice(0).length;
  }
}
