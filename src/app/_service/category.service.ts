import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {PostCategory} from '../_model/post/post-category.entity';
import {BehaviorSubject, Observable} from 'rxjs';
import {APIResponse} from '../_model/api/api-response.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * @class CategoryService
 */
export class CategoryService {
  /**
   * @private
   * @property
   */
  private $currentCategory: BehaviorSubject<PostCategory>;

  /**
   * CategoryService Constructor
   *
   * @constructor
   * @param apiService
   */
  constructor(private apiService: APIService) {
    this.$currentCategory = new BehaviorSubject<PostCategory>(
      JSON.parse(localStorage.getItem('gifmn-category'))
    );
  }

  /**
   * Get Categories
   *
   * @public
   * @returns Observable<PostCategory[]>
   */
  public categories(): Observable<PostCategory[]> {
    return (this.apiService
      .get<PostCategory[]>('categories') as Observable<APIResponse<PostCategory[]>>)
      .pipe(
        map(value => value.data)
      ) as Observable<PostCategory[]>;
  }

  /**
   * Delete Category
   *
   * @public
   * @param id
   * @returns Observable<boolean>
   */
  public delete(id: number): Observable<boolean> {
    return (this.apiService.del<boolean>(`category/${id}`) as Observable<APIResponse<boolean>>).pipe(
      map(value => value.data)
    );
  }

  /**
   * @public
   * @param id
   * @param name
   * @returns Observable<boolean>
   */
  public update(id: number, name: string): Observable<boolean> {
    return (this.apiService.put<boolean>(`category/${id}`, {name}) as Observable<APIResponse<boolean>>).pipe(
      map(value => value.data)
    );
  }

  /**
   * @public
   * @param name
   * @returns Observable<PostCategory>
   */
  public create(name: string): Observable<PostCategory> {
    return (this.apiService.post<PostCategory>('category', {name}) as Observable<APIResponse<PostCategory>>).pipe(
      map(value => value.data)
    );
  }

  /**
   * Get Current Category
   *
   * @public
   * @returns PostCategory
   */
  public get category(): PostCategory {
    return this.$currentCategory.value;
  }

  /**
   * Set Token
   *
   * @public
   * @param value
   */
  public set category(value: PostCategory) {
    localStorage.setItem('gifmn-category', JSON.stringify(value));
    this.$currentCategory.next(value);
  }
}
