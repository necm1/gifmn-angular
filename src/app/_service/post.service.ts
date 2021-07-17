import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';
import {Post} from '../_model/post/post.entity';
import {UserService} from './user.service';
import {APIResponse} from '../_model/api/api-response.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * @class PostService
 */
export class PostService {

  /**
   * PostService Constructor
   *
   * @constructor
   * @param apiService
   * @param userService
   */
  constructor(
    private apiService: APIService,
    private userService: UserService
  ) {
  }

  /**
   * Update Post
   *
   * @public
   * @param id
   * @param body
   * @returns Observable<boolean>
   */
  public update(id: number, body: FormData): Observable<boolean> {
    return (this.apiService.put<boolean>('post/' + id, body) as Observable<APIResponse<boolean>>).pipe(
      map(value => value.data)
    );
  }
}
