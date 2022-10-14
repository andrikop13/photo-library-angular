import { Component } from '@angular/core';
import { fadeAnimation } from './@theme/animations';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main
      role="main"
      [@fadeAnimation]="outlet.isActivated ? outlet.activatedRoute : ''"
    >
      <div class="main-body">
        <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </main>
  `,
  styles: [
    `
      .main-body {
        width: 90%;
        margin: 2% 5%;
        display: flex;
        justify-content: center;
        max-height: 75vh;
      }
    `,
  ],
  animations: [fadeAnimation],
})
export class AppComponent {
  title = 'photo-library-angular';
}
