import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { PhotosStoreService } from 'src/app/store/photos-store.service';
import { Photo } from '../../shared/models/photo';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
})
export class PhotosListComponent implements OnInit, OnDestroy {
  library: Photo[] = [];
  hasMore: boolean = false;
  routeSubscription!: Subscription;
  storeSubscription!: Subscription;

  trackByFn(_: any, { id }: Photo): number {
    return id;
  }

  constructor(
    private route: ActivatedRoute,
    private photoStore: PhotosStoreService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.data
      .pipe(first())
      .subscribe(() => this.getNext());
  }

  getNext() {
    this.storeSubscription = this.photoStore.loadNext().subscribe((photos) => {
      this.library.push(...photos);
      this.hasMore = !(this.library.length === this.photoStore.totalPhotos);
    });
  }

  onScroll() {
    console.log('SCROLL ');
    this.getNext();
  }

  addToFavorite(photo: Photo) {
    const index = this.library.findIndex((el) => el.id === photo.id);
    this.library[index].favorite = true;

    this.photoStore.addToFavorite(photo);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();

    this.photoStore.emptyPhotos();
  }
}
