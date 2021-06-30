import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {User} from '../_model/user/user.model';
import {APIResponse} from '../_model/api/api-response.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * @class UserService
 */
export class UserService {
  /**
   * @private
   * @property
   */
  private userSubject: BehaviorSubject<User>;

  /**
   * UserService Constructor
   *
   * @constructor
   * @param apiService
   */
  constructor(private apiService: APIService) {
    let user: User = JSON.parse(localStorage.getItem('gifmn-user'));

    if (!user) {
      user = {} as User;
    }

    this.userSubject = new BehaviorSubject<User>(user);
  }

  /**
   * Validate Session
   *
   * @public
   * @returns Observable<User>
   */
  public validateSession(): Observable<User> {
    return (this.apiService.get<User>('user') as Observable<APIResponse<User>>)
      .pipe(
        map(value => {
          this.user = value.data as User;
          return value.data;
        })
      ) as Observable<User>;
  }

  /**
   * Get Current User
   *
   * @public
   * @returns User
   */
  public get user(): User {
    return this.userSubject.value;
  }

  /**
   * Set User
   *
   * @public
   * @param value
   */
  public set user(value: User) {
    this.userSubject.next(value);
    localStorage.setItem('gifmn-user', JSON.stringify(value));
  }
}
