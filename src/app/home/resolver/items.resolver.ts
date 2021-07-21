import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PostCategory} from '../../_model/post/post-category.entity';
import {Observable} from 'rxjs';
import {APIService} from '../../_service/api.service';
import {Post} from '../../_model/post/post.entity';
import {APIResponseList} from '../../_model/api/api-response-list.model';
import {CategoryService} from '../../_service/category.service';

@Injectable({providedIn: 'root'})
/**
 * @class ItemsResolver
 * @implements Resolve<Post>
 */
export class ItemsResolver implements Resolve<APIResponseList<Post>> {
  /**
   * ItemsResolver Constructor
   *
   * @constructor
   * @param apiService
   * @param categoryService
   */
  constructor(
    private apiService: APIService,
    private categoryService: CategoryService
  ) {
  }

  /**
   * Resolve Items
   *
   * @public
   * @param route
   * @param state
   * @returns Observable<APIResponseList<Post>>
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<APIResponseList<Post>> {
    const activeCategory: PostCategory = this.categoryService.category;

    if (activeCategory) {
      return this.apiService.get<Post>(
        `category/${activeCategory.id}/posts?page=1`,
        {},
        true
      ) as Observable<APIResponseList<Post>>;
    }

    return this.apiService.get<Post>(
      'category/1/posts?page=1&limit=35',
      {},
      true
    ) as Observable<APIResponseList<Post>>;
  }
}
