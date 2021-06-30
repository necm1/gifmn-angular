import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';
import {AuthService} from '../../../auth/service/auth.service';
import {User} from '../../../_model/user/user.model';
import {UserService} from '../../../_service/user.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({transform: 'translateY(200%)'}),
        animate('150ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({transform: 'translateY(200%)'}))
      ])
    ])
  ]
})
/**
 * @class FooterComponent
 * @implements {OnInit, OnDestroy}
 */
export class FooterComponent implements OnInit, OnDestroy {
  /**
   * @public
   * @property
   */
  public user: User;

  /**
   * @public
   * @property
   */
  public isAuthenticated = false;

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

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  /**
   * Handle Component Initialization
   *
   * @public
   */
  public ngOnInit(): void {
    this.currentSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated = !!this.authService.token;

    this.user = this.userService.user ?? {} as User;

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
