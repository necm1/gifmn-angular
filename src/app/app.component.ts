import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MetaService} from './_service/meta.service';

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
   * @param meta
   */
  constructor(
    private router: Router,
    private meta: MetaService
  ) {
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
