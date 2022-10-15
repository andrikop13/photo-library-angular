import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-animate-list',
  template: ` <div [@listAnimation]="library?.length" class="library">
    <ng-content></ng-content>
  </div>`,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(100, [animate('0.5s', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
  styles: [
    `
      .library {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 6.4rem;
      }
    `,
  ],
})
export class AnimateListComponent implements OnInit {
  @Input()
  library!: Photo[] | null;

  constructor() {}

  ngOnInit(): void {}
}
