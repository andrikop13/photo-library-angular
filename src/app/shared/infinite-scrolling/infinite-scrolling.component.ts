import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
  tap,
} from 'rxjs';

@Component({
  selector: 'infinite-scroll',
  template: `<ng-content></ng-content>
    <div
      class="spinnerContainer"
      #anchor
      [ngStyle]="{ height: hasMore ? '50vh' : '2vh' }"
    >
      <mat-spinner class="anchorObserve" *ngIf="loading"></mat-spinner>
    </div> `,
  styles: [
    `
      .spinnerContainer {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class InfiniteScrollingComponent implements OnInit, OnDestroy {
  @Input()
  loading!: boolean;
  @Input() hasMore!: boolean;
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true })
  anchor!: ElementRef;

  totalElements: number = 0;
  scrollSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options = {
      thresold: 0.9,
    };

    const mainBody = document.querySelector('.main-body');
    const scrollEvent = fromEvent(mainBody as Element, 'scroll');

    this.scrollSubscription = scrollEvent
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          const ch = mainBody!.clientHeight;
          const st = mainBody!.scrollTop;
          const sh = mainBody!.scrollHeight;
          const ratio = (ch + st) / sh;

          if (ratio > options.thresold) {
            this.scrolled.emit();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }
}
