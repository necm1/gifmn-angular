import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PostCategory} from '../../_model/post/post-category.entity';
import {Observable} from 'rxjs';
import {PostService} from '../../_service/post.service';
import {Post} from '../../_model/post/post.entity';
import {APIResponseList} from '../../_model/api/api-response-list.model';
import {APIResponse} from '../../_model/api/api-response.model';

@Injectable({ providedIn: 'root' })
/**
 * @class SearchResolver
 * @implements Resolve<Post[]>
 */
export class SearchResolver implements Resolve<APIResponse<Post[]>> {
  /**
   * SearchResolver Constructor
   *
   * @constructor
   * @param postService
   */
  constructor(
    private postService: PostService,
  ) {}

  /**
   * Resolve Categories
   *
   * @public
   * @param route
   * @param state
   * @returns Observable<PostCategory[]>
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<APIResponse<Post[]>> {
    return this.postService.search(route.params.query);
  }
}
