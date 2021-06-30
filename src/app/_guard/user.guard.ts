import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../_service/user.service';
import {AuthService} from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 * @class UserGuard
 * @implements {CanActivate, CanActivateChild}
 */
export class UserGuard implements CanActivate, CanActivateChild {
  /**
   * UserGuard Constructor
   *
   * @constructor
   * @param userService
   * @param authService
   * @param router
   */
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  /**
   * @public
   * @param route
   * @param state
   * @returns boolean
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.validateSession();
    return true;
  }

  /**
   * @public
   * @param childRoute
   * @param state
   * @returns boolean
   */
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.validateSession();

    return true;
  }

  /**
   * Validate Current Session
   *
   * @private
   */
  private validateSession(): void {
    if (!this.authService.token) {
      return;
    }

    const subscription: Subscription = this.userService.validateSession().subscribe({
      error: () => this.router.navigateByUrl('auth/logout'),
      complete: () => subscription.unsubscribe()
    });
  }
}
