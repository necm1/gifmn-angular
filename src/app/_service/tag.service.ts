import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';
import {APIResponse} from '../_model/api/api-response.model';

@Injectable({
  providedIn: 'root'
})
/**
 * @class TagService
 */
export class TagService {
  /**
   * TagService Constructor
   *
   * @constructor
   * @param apiService
   */
  constructor(
    private apiService: APIService
  ) {
  }

  /**
   * Delete Tag
   *
   * @public
   * @param id
   * @returns Observable<APIResponse<unknown>>
   */
  public delete(id: number): Observable<APIResponse<any>> {
    return this.apiService.del(`tag/${id}`) as Observable<APIResponse<any>>;
  }
}
