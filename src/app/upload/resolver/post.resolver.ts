import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {PostCategory} from '../../_model/post/post-category.entity';
import {Observable} from 'rxjs';
import {APIService} from '../../_service/api.service';
import {APIResponse} from '../../_model/api/api-response.model';
import {catchError, map} from 'rxjs/operators';
import {Post} from '../../_model/post/post.entity';

@Injectable({providedIn: 'root'})
/**
 * @class PostResolver
 * @implements Resolve<Post>
 */
export class PostResolver implements Resolve<Post> {
  /**
   * CategoryResolver Constructor
   *
   * @constructor
   * @param apiService
   * @param router
   */
  constructor(
    private apiService: APIService,
    private router: Router
  ) {
  }

  /**
   * Resolve Post
   *
   * @public
   * @param route
   * @param state
   * @returns Observable<Post>
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> {
    return (this.apiService
      .get<Post>(`post/${route.paramMap.get('id')}`) as Observable<APIResponse<Post>>)
      .pipe(
        map(value => value.data),
        catchError((err, caught) => {
          this.router.navigateByUrl('404');
          return err;
        })
      ) as Observable<Post>;
  }
}
