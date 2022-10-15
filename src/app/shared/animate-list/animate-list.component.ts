import { Component, Input, OnInit } from '@angular/core';
import { animationList } from 'src/app/@theme/animations';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-animate-list',
  template: ` <div [@listAnimation]="library?.length" class="library">
    <ng-content></ng-content>
  </div>`,
  animations: [animationList],
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
  library: Photo[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
