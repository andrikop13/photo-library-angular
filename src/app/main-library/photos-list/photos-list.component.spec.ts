import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PhotosStoreService } from 'src/app/store/photos-store.service';
import { PHOTOS } from 'test-data/photos';

import { PhotosListComponent } from './photos-list.component';

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;
  let el: DebugElement;
  let photoStore: any;
  let router: any;

  beforeEach(async () => {
    const photoStoreSpy = jasmine.createSpyObj('PhotosStoreService', [
      'loadNext',
    ]);
    const route = { data: of({ data: PHOTOS }) } as any as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [PhotosListComponent],
      providers: [
        { provide: PhotosStoreService, useValue: photoStoreSpy },
        { provide: ActivatedRoute, useValue: route },
      ],
      teardown: { destroyAfterEach: false },
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PhotosListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        photoStore = TestBed.inject(PhotosStoreService);
        router = TestBed.inject(ActivatedRoute);

        photoStore.loadNext.and.returnValue(of(PHOTOS));
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display photos on library', () => {
    fixture.detectChanges();

    const cards = el.queryAll(By.css('app-single-item'));
    expect(cards.length).toBe(39, 'Must find one mat-card with favorite photo');
  });

  it('add to favorite when click button', () => {
    fixture.detectChanges();

    spyOn(component, 'addToFavorite');

    let button = el.query(By.css('app-single-item'));

    button.triggerEventHandler('addFavorite', null);

    expect(component.addToFavorite).toHaveBeenCalled();
  });
});
