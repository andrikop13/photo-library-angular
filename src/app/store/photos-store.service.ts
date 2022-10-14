import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Photo } from '../shared/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotosStoreService {
  PICSUM_URL: string = 'https://picsum.photos/list';
  photos_library = new BehaviorSubject<Photo[]>([]);

  constructor(private http: HttpClient) {}

  getPhotos() {
    return this.http
      .get<Photo[]>(this.PICSUM_URL)
      .pipe(tap((data) => console.log(data)));
  }

  addToFavorite(photo: Photo) {}
}
