import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'infinite-scroll',
  template: `<ng-content></ng-content>
    <div
      class="spinnerContainer"
      #anchor
      [ngStyle]="{ height: hasMore ? '50vh' : '0vh' }"
    >
      <mat-spinner class="anchorObserve" *ngIf="hasMore"></mat-spinner>
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
  @Input() options = {};

  @Input()
  hasMore!: boolean;

  @Output() scrolled = new EventEmitter();

  @ViewChild('anchor', { static: true })
  anchor!: ElementRef;

  totalElements: number = 0;

  private observer!: IntersectionObserver;

  constructor(
    private host: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options = {
      root: document.querySelector('.main-body'),
      thresold: 0.5,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.hasMore && this.observer.observe(this.anchor.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    changes['hasMore']?.currentValue &&
      this.observer.observe(this.anchor.nativeElement);
  }

  get element() {
    return this.host.nativeElement;
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
