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
import { DbStoreService } from '../store/db-store.service';
import { PhotosStoreService } from '../store/photos-store.service';

@Injectable({
  providedIn: 'root',
})
export class PhotosResolver implements Resolve<boolean> {
  constructor(
    private dbStore: DbStoreService,
    private photoStore: PhotosStoreService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return !this.dbStore.isEmpty() ? of([]) : this.photoStore.loadPhotos();
  }
}
