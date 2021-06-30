import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {APIService} from '../../_service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * @private
   * @property
   */
  private $currentUser: BehaviorSubject<any>;

  /**
   * @private
   * @property
   */
  private $currentToken: BehaviorSubject<string>;

  /**
   * AuthService Constructor
   *
   * @constructor
   */
  constructor() {
    this.$currentUser = new BehaviorSubject<any>('');
    this.$currentToken = new BehaviorSubject<string>(localStorage.getItem('gifmn-token'));
  }

  /**
   * Get Current Token
   *
   * @public
   * @returns string
   */
  public get token(): string {
    return this.$currentToken.value;
  }

  /**
   * Set Token
   *
   * @public
   * @param value
   */
  public set token(value: string) {
    localStorage.setItem('gifmn-token', value);
    this.$currentToken.next(value);
  }
}
