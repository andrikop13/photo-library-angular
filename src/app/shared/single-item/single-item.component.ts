import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CONFIG } from 'src/config';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styles: [
    `
      .mat-card-actions {
        padding: 0 !important;
      }

      .heart {
        display: inline-block;
        color: red;
        font-size: 24px;
        margin-left: 1rem;
        padding: 0.25rem;
      }
    `,
  ],
})
export class SingleItemComponent implements OnInit {
  @Input('photo') photo!: Photo;
  @Input('size') size!: number;
  @Output() addFavorite = new EventEmitter<Photo>();

  photoUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    const size = this.size || 250;
    if (!this.photo) return;
    this.photoUrl = `${CONFIG.singlePhotoUrl}/${this.photo.id}/${size}/${size}.jpg`;
  }

  addToFavorite(photo: Photo) {
    this.addFavorite.emit(photo);
  }
}
