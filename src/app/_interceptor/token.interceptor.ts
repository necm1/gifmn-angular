import {UserService} from '../_service/user.service';
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/service/auth.service';

@Injectable()
/**
 * @class TokenInterceptor
 * @implements HttpInterceptor
 */
export class TokenInterceptor implements HttpInterceptor {
  /**
   * TokenInterceptor Constructor
   *
   * @constructor
   * @param userService
   * @param authService
   */
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  /**
   * Intercept Request & Add JWT Token
   *
   * @public
   * @param request
   * @param next
   * @returns Observable<HttpEvent<any>>
   */
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
