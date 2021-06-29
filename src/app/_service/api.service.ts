import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APIResponse} from '../_model/api/api-response.model';
import {APIResponseList} from '../_model/api/api-response-list.model';

@Injectable({
  providedIn: 'root'
})
/**
 * @class APIService
 */
export class APIService {
  /**
   * APIService Constructor
   *
   * @constructor
   * @param http
   */
  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Make GET Request
   *
   * @public
   * @param url
   * @param options
   * @param list
   * @returns Observable<APIResponse<T> | APIResponseList<T>>
   */
  public get<T>(
    url: string,
    options = {},
    list = false,
  ): Observable<APIResponse<T>> | Observable<APIResponseList<T>> {
    if (list) {
      return this.http.get<APIResponseList<T>>(
        this.buildURL(url),
          options
      );
    }

    return this.http.get<APIResponse<T>>(
      this.buildURL(url),
      options
    );
  }

  /**
   * Build URL With API Endpoint
   *
   * @public
   * @param value
   * @return string
   */
  public buildURL(value: string): string {
    return `${environment.app.endpoint}/${value}`;
  }
}
