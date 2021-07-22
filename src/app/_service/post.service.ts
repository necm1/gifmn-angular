import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {Observable, pipe} from 'rxjs';
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
   * Search Post
   *
   * @public
   * @param query
   */
  public search(query: string): Observable<APIResponse<Post[]>> {
    return this.apiService.post<Post[]>('post/search', {query}) as Observable<APIResponse<Post[]>>;
  }

  /**
   * Update Post
   *
   * @public
   * @param id
   * @param body
   * @returns Observable<boolean>
   */
  public update(id: number, body: FormData): Observable<Post> {
    return (this.apiService.put<Post>(`post/${id}`, body) as Observable<APIResponse<Post>>).pipe(
      map(value => value.data)
    );
  }

  /**
   * Delete Post
   *
   * @public
   * @param id
   * @returns Observable<boolean>
   */
  public delete(id: number): Observable<boolean> {
    return this.apiService.del<boolean>(`post/${id}`).pipe(
      map(value => value.data)
    );
  }
}
