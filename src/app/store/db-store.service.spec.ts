import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DbStoreService } from './db-store.service';
import { PHOTOS } from 'test-data/photos';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../shared/models/photo';

describe('DbStoreService', () => {
  let dbStoreService: DbStoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DbStoreService],
    });

    (dbStoreService = TestBed.inject(DbStoreService)),
      (httpTestingController = TestBed.inject(HttpTestingController));
  });

  it('should retrieve all photos from picsum open API', () => {
    dbStoreService.load().subscribe((photos) => {
      expect(photos).toBeTruthy('No photos returned');

      expect(photos.length).toBe(39, 'incorrect number of photos');

      const photo = photos.find((photo) => photo.id === 10);

      expect(photo?.author).toBe('Paul Jarvis');
    });

    const req = httpTestingController.expectOne('https://picsum.photos/list');

    expect(req.request.method).toEqual('GET');

    // Pass test data on our httpRequest
    req.flush(PHOTOS);
  });

  it('should retrieve a range of photos from lower, upper arguments', fakeAsync(() => {
    dbStoreService['fillDB'] = new BehaviorSubject<Photo[]>(PHOTOS);
    dbStoreService['EmulatePhotosDB$'] =
      dbStoreService['fillDB'].asObservable();

    dbStoreService.getRange(2, 10).subscribe((photos) => {
      expect(photos).toBeTruthy('No photos returned');

      expect(photos.length).toBe(10, 'incorrect number of photos returned');

      const photo = photos.find((photo) => photo.id == 1016);

      expect(photo?.author).toBe('Philippe Wuyts');
    });

    tick(700);

    flush();
  }));

  it('check if db is empty', () => {
    dbStoreService['fillDB'] = new BehaviorSubject<Photo[]>(PHOTOS);

    let isEmpty = dbStoreService.isEmpty();
    expect(isEmpty).toBe(false, 'Expected non empty database');

    dbStoreService['fillDB'] = new BehaviorSubject<Photo[]>([]);

    isEmpty = dbStoreService.isEmpty();
    expect(isEmpty).toBe(true, 'Expected non empty database');
  });
});
