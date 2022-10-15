import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Photo } from '../models/photo';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss'],
})
export class SingleItemComponent implements OnInit {
  @Input('photo') photo!: Photo;
  @Output() addFavorite = new EventEmitter<Photo>();

  photoUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    this.photoUrl = `https://picsum.photos/id/${this.photo.id}/250/250.jpg`;
  }

  addToFavorite(photo: Photo) {
    this.addFavorite.emit(photo);
  }
}
