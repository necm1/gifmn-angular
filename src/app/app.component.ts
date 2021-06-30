import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * @class AppComponent
 */
export class AppComponent {
  /**
   * AppComponent Constructor
   *
   * @constructor
   * @param router
   */
  constructor(private router: Router) {
  }

  /**
   * Get Current URL
   *
   * @public
   * @returns string
   */
  public get currentURL(): string {
    return this.router.url;
  }
}
