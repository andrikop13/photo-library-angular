import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PHOTOS } from 'test-data/photos';
import { SharedModule } from '../shared.module';

import { SingleItemComponent } from './single-item.component';

describe('SingleItemComponent', () => {
  let component: SingleItemComponent;
  let fixture: ComponentFixture<SingleItemComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [SingleItemComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SingleItemComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        component.photo = PHOTOS[0];
        (component.photoUrl = 'TEST INPUT URL'), fixture.detectChanges();
        component.size = 300;
        fixture.detectChanges();
      });
  });

  it('should create SingleItemComponent', () => {
    expect(component).toBeTruthy();
  });

  xit('should show TEST INPUT URL', fakeAsync(() => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.mat-card-image').src
    ).toContain(
      `picsum.photos/${PHOTOS[0].id}/${component.size}/${component.size}.jpg`
    );
  }));
});
