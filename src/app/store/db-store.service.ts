import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { Photo } from '../shared/models/photo';

@Injectable({
  providedIn: 'root',
})
export class DbStoreService {
  PICSUM_URL: string = 'https://picsum.photos/list';
  private filterPhotosNum: number = 100;
  private limit: number = 10;

  private fillDB = new BehaviorSubject<Photo[]>([]);
  private EmulatePhotosDB$: Observable<Photo[]> = this.fillDB.asObservable();

  totalPhotos: number = this.filterPhotosNum;

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<Photo[]>(this.PICSUM_URL).pipe(
      map((photos) =>
        photos.map((p) => {
          return {
            id: p.id,
          };
        })
      ),
      tap((photos: Photo[]) => {
        const photosLimit = photos.slice(0, this.filterPhotosNum + 1);
        this.fillDB.next(photosLimit);
        this.totalPhotos = this.filterPhotosNum;
      })
    );
  }

  getRange(page: number, limit = this.limit) {
    const lower = page * limit;
    let upper = (page + 1) * limit;

    if (upper > this.totalPhotos - 1) upper = this.totalPhotos;

    return this.EmulatePhotosDB$.pipe(
      map((photos) => photos.slice(lower, upper)),
      delay(Math.random() * (500 - 300) + 300) // Emulate real time API delay
    );
  }

  isEmpty() {
    return !this.fillDB.getValue().slice(0).length;
  }
}
