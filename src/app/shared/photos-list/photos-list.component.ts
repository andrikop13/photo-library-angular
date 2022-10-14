import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { PhotosStoreService } from 'src/app/store/photos-store.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
})
export class PhotosListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private photoStore: PhotosStoreService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe(() => this.getNext());
  }

  getNext() {
    this.photoStore.getPhotos().subscribe((photos) => console.log(photos));
  }
}
