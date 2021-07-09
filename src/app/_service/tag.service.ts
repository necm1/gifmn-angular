import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';
import {APIResponse} from '../_model/api/api-response.model';
import {PostTag} from '../_model/post/post-tag.entity';

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

  /**
   * Update Tag
   *
   * @public
   * @param tag
   * @returns Observable<APIResponse<PostTag>>
   */
  public update(tag: PostTag): Observable<APIResponse<PostTag>> {
    return this.apiService.put<PostTag>(`tag/${tag.id}`, tag);
  }
}
