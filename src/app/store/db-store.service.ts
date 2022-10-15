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
  totalPhotos: number = this.filterPhotosNum;

  private fillDB = new BehaviorSubject<Photo[]>([]);
  private EmulatePhotosDB$: Observable<Photo[]> = this.fillDB.asObservable();

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<Photo[]>(this.PICSUM_URL).pipe(
      tap((photos: Photo[]) => {
        const photosLimit = photos.slice(0, this.filterPhotosNum + 1);
        this.fillDB.next(photosLimit);
        this.totalPhotos = this.filterPhotosNum;
      })
    );
  }

  getRange(lower: number, upper: number) {
    return this.EmulatePhotosDB$.pipe(
      map((photos) => photos.slice(lower, upper)),
      delay(500)
    );
  }
}
