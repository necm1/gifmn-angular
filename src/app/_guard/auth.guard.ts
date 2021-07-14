import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
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
   * @param route
   * @param state
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.token) {
      this.router.navigateByUrl('404');
    }

    return true;
  }

}
