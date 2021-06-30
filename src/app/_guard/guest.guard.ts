import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 * @class GuestGuard
 * @implements {CanActivate, CanActivateChild}
 */
export class GuestGuard implements CanActivate, CanActivateChild {
  /**
   * AuthService Constructor
   *
   * @constructor
   * @param authService
   * @param router
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  /**
   * Handle Routes
   *
   * @public
   * @param route
   * @param state
   * @returns boolean
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handleGuard();
  }

  /**
   * Handle Route Child
   *
   * @public
   * @param childRoute
   * @param state
   * @returns boolean
   */
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handleGuard();
  }

  /**
   * Handle Guard
   *
   * @private
   * @returns boolean
   */
  private handleGuard(): boolean {
    if (this.authService.token) {
      this.router.navigateByUrl('404');
    }

    return true;
  }

}
