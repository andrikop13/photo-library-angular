import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FAVORITES } from 'test-data/favorites';
import { PHOTOS } from 'test-data/photos';
import { Photo } from '../shared/models/photo';
import { DbStoreService } from './db-store.service';

import { PhotosStoreService } from './photos-store.service';

describe('PhotosStoreService', () => {
  let photoService: PhotosStoreService;
  let dbService: any;

  beforeEach(() => {
    dbService = jasmine.createSpyObj('DbStoreService', ['getRange', 'load']);

    TestBed.configureTestingModule({
      providers: [
        PhotosStoreService,
        { provide: DbStoreService, useValue: dbService },
      ],
    });

    photoService = TestBed.inject(PhotosStoreService);

    photoService['dbStore'] = dbService;
    photoService['updatePhotos'] = new BehaviorSubject<Photo[]>(PHOTOS);
    photoService['saveState'] = new BehaviorSubject<Photo[]>(FAVORITES);
    photoService['state'] = photoService['saveState'] as Observable<Photo[]>;
    photoService['totalPhotos'] = 100;
  });

  it('should add to favorite', () => {
    const selectFirst = PHOTOS[0];

    photoService.addToFavorite(PHOTOS[0]);
    const state = photoService['state'].subscribe((photos) => {
      const favorite = photos.find((p) => p.id === selectFirst.id);

      expect(favorite?.favorite).toBe(true, 'Favorite status not changed');
    });
  });

  it('should remove from favorite', () => {
    const selectFirst = FAVORITES[0];

    photoService.removeFromFavorite(selectFirst);
    const state = photoService['state'].subscribe((photos) => {
      const favorite = photos.find((p) => p.id === selectFirst.id);

      expect(favorite).toBe(undefined, 'Favorite status not changed');
    });
  });

  it('check favorite status of list after refresh', () => {
    const updatedPhotos = photoService.getFavoriteStatus(PHOTOS);

    expect(updatedPhotos[0].favorite).toBe(
      FAVORITES[0].favorite,
      'Favorite status not updated after refresh'
    );
  });
});
