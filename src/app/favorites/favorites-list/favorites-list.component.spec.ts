import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Photo } from 'src/app/shared/models/photo';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhotosStoreService } from 'src/app/store/photos-store.service';
import { FAVORITES } from 'test-data/favorites';
import { FavoritesListComponent } from './favorites-list.component';

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;
  let el: DebugElement;
  let photoStore: any;
  let router: any;

  const favoritePhotos: Photo[] = FAVORITES;

  beforeEach(async () => {
    const photoStoreSpy = jasmine.createSpyObj('PhotosStoreService', [
      'getState',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [FavoritesListComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: PhotosStoreService, useValue: photoStoreSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FavoritesListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        photoStore = TestBed.inject(PhotosStoreService);
        router = TestBed.inject(Router);

        photoStore.getState.and.returnValue(of(favoritePhotos));
      });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the favorite photos', fakeAsync(() => {
    fixture.detectChanges();

    const cards = el.queryAll(By.css('.mat-card-image'));
    expect(cards.length).toBe(13, 'Unexpected number of cards found');
  }));

  xit('should navigate on click card button', () => {
    spyOn(component, 'openPhoto');

    fixture.detectChanges();

    let button = el.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(component.openPhoto).toHaveBeenCalled();
  });
});
