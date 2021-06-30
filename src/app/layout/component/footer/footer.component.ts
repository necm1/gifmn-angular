import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
/**
 * @class FooterComponent
 * @implements {OnInit, OnDestroy}
 */
export class FooterComponent implements OnInit, OnDestroy {
  /**
   * @private
   * @property
   */
  private subscription: Subscription;

  /**
   * @private
   * @property
   */
  private currentSubject: BehaviorSubject<boolean>;

  /**
   * Handle Component Initialization
   *
   * @public
   */
  public ngOnInit(): void {
    this.currentSubject = new BehaviorSubject<boolean>(false);

    this.subscription = fromEvent(document.body, 'scroll').subscribe({
      next: () => {
        const target = document.body;
        this.state = target.scrollTop > 10;
      }
    });
  }

  /**
   * Handle Component Destroy
   *
   * @public
   */
  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.unsubscribe) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Get Current State
   *
   * @public
   * @returns boolean
   */
  public get state(): boolean {
    return this.currentSubject.value;
  }

  /**
   * @public
   * @param value
   */
  public set state(value: boolean) {
    this.currentSubject.next(value);
  }
}
