import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeAnimation } from 'src/app/@theme/animations';
import { Photo } from 'src/app/shared/models/photo';
import { PhotosStoreService } from 'src/app/store/photos-store.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './photo-info.component.html',
  styleUrls: ['./photo-info.component.scss'],
})
export class PhotoInfoComponent implements OnInit, OnDestroy {
  currentPhoto!: Photo;
  subscription!: Subscription;

  constructor(
    private photoStore: PhotosStoreService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getPhotoInfo();
  }

  getPhotoInfo() {
    const photoId = Number(this.router.snapshot.paramMap.get('id'));

    this.subscription = this.photoStore.getState().subscribe((favorites) => {
      this.currentPhoto = favorites.find((el) => el.id === photoId) as Photo;
      if (!this.currentPhoto) this.route.navigate(['/favorites']);
    });
  }

  deleteFromFavorite() {
    this.photoStore.removeFromFavorite(this.currentPhoto);
    this.route.navigate(['/favorites']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
