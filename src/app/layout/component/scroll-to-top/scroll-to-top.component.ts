import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, interval as observableInterval, Subscription} from 'rxjs';
import {takeWhile, scan, tap} from 'rxjs/operators';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
/**
 * @class ScrollToTopComponent
 * @implements {OnInit, OnDestroy}
 */
export class ScrollToTopComponent implements OnInit, OnDestroy {
  /**
   * @private
   * @property
   */
  private $show = false;

  /**
   * @private
   * @property
   */
  private subscription: Subscription;

  /**
   * Handle Component Initialization
   *
   * @public
   */
  public ngOnInit(): void {
    this.subscription = fromEvent(document.body, 'scroll').subscribe({
      next: () => {
        const target = document.body;
        this.$show = target.scrollTop > 10;
      }
    });
  }

  /**
   * Handle Destroy
   *
   * @public
   */
  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.unsubscribe) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Scroll Smoothly to Top
   *
   * @public
   */
  public toTop(): void {
    const duration = 250;
    const interval = 5;
    const move = document.body.scrollTop * interval / duration;
    const subscription = observableInterval(interval).pipe(
      scan((acc, curr) => acc - move, document.body.scrollTop),
      tap(position => document.body.scrollTop = position),
      takeWhile(val => val > 0)).subscribe({
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * Get Current State
   *
   * @public
   * @returns boolean
   */
  public get show(): boolean {
    return this.$show;
  }

}
