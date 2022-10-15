import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Photo } from '../shared/models/photo';
import { PhotosStoreService } from '../store/photos-store.service';

@Injectable({
  providedIn: 'root',
})
export class PhotosResolver implements Resolve<boolean> {
  constructor(private photoStore: PhotosStoreService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const currentData = this.photoStore.getClone();
    return !currentData.length ? this.photoStore.loadPhotos() : of(currentData);
  }
}
