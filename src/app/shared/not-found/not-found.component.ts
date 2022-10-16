import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<div class="notFoundContainer">
    <h1>Page Not Found</h1>
    <h2>We couldn't find that page. Please try again!</h2>
  </div>`,
  styles: [
    `
      .notFoundContainer {
        height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      h1 {
        margin-bottom: 1rem;
        font-size: 3.6rem;
      }

      h2 {
        font-weight: 500;
      }
    `,
  ],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
