import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PostCategory} from '../../_model/post/post-category.entity';
import {Observable} from 'rxjs';
import {APIService} from '../../_service/api.service';
import {APIResponse} from '../../_model/api/api-response.model';
import {map} from 'rxjs/operators';
import {CategoryService} from '../../_service/category.service';

@Injectable({ providedIn: 'root' })
/**
 * @class CategoryResolver
 * @implements Resolve<PostCategory[]>
 */
export class CategoryResolver implements Resolve<PostCategory[]> {
  /**
   * CategoryResolver Constructor
   *
   * @constructor
   * @param categoryService
   */
  constructor(
    private categoryService: CategoryService
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
  ): Observable<PostCategory[]> {
    return this.categoryService.categories();
  }
}
