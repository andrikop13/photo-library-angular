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
import { Photo } from 'src/app/shared/models/photo';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhotosStoreService } from 'src/app/store/photos-store.service';
import { FAVORITES } from 'test-data/favorites';
import { PhotoInfoComponent } from './photo-info.component';

describe('PhotoInfoComponent', () => {
  let component: PhotoInfoComponent;
  let fixture: ComponentFixture<PhotoInfoComponent>;
  let el: DebugElement;
  let photoStore: any;
  let router: any;

  const photoIdZero = FAVORITES[0];

  beforeEach(async () => {
    const photoStoreSpy = jasmine.createSpyObj('PhotosStoreService', [
      'getState',
      'removeFromFavorite',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PhotoInfoComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: PhotosStoreService, useValue: photoStoreSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map().set('id', 0) },
          },
        },
      ],
      teardown: { destroyAfterEach: false },
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PhotoInfoComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        photoStore = TestBed.inject(PhotosStoreService);
        router = TestBed.inject(Router);

        photoStore.getState.and.returnValue(of(FAVORITES));
      });
  });

  it('should create Photo info component', () => {
    expect(component).toBeTruthy();
  });

  it('should display photo', () => {
    fixture.detectChanges();

    const cards = el.queryAll(By.css('mat-card'));
    expect(cards.length).toBe(1, 'Must find one mat-card with favorite photo');
  });

  it('should delete from favorite on remove click button', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(component, 'deleteFromFavorite');

    fixture.detectChanges();

    let button = el.query(By.css('.mat-stroked-button'));

    button.triggerEventHandler('click', null);

    tick(2000);
    fixture.detectChanges();

    expect(component.deleteFromFavorite).toHaveBeenCalled();
  }));
});
